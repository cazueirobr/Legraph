import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
  setDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import useFirebase from './useFirebase';

interface DocumentData {
  [key: string]: any;
}

/**
 * Hook to access and manage a firestore collection.
 * @param collectionName Collection name in plural (e.g. 'books'). Can also be a path to subcollection.
 * @param precache Should all records be loaded when hook starts? default is true. Avoid using with big collections.
 * @returns
 */
export default function useCollection<T extends DocumentData>(
  collectionName: string,
  precache = true
) {
  useFirebase();

  const db = getFirestore();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Array<T>>([]);

  /**
   * Create a new document in the collection.
   * @param newVal A new record of collection type.
   * @returns Id of the created document.
   */
  const create = async (newVal: T, email: string) => {
    const documentId = email;
    const docRef = doc(db, collectionName, documentId);
    await setDoc(docRef, newVal);
    return docRef.id;
  };

  /**
   * Remove a document from collection.
   * @param id Document id to be removed.
   */
  const remove = async (id: string) => {
    await deleteDoc(doc(db, collectionName, id));
  };

  /**
   * Update a document in the collection.
   * @param id Document id to be updated.
   * @param newVal New value for the given document (overrides the entire Document!).
   */
  const update = async (id: string, newVal: T) => {
    if (newVal.id) delete newVal.id;
    await updateDoc(doc(db, collectionName, id), newVal);
  };

  /**
   * Get all documents from the collection.
   * @returns An array of the collection type with all elements.
   */
  const all = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, collectionName));
    const dataAsMap = querySnapshot.docs.map((doc) => {
      const data = doc.data() as T;
      return { id: doc.id, ...data };
    });
    setData(dataAsMap);
    setLoading(false);
    return dataAsMap;
  };

  /**
   * Get a document by its ID.
   * @param id Document id to be retrieved.
   * @returns The document data if found, otherwise null.
   */
  const getById = async (id: string) => {
    setLoading(true);
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as T;
      setLoading(false);
      return { id: docSnap.id, ...data };
    } else {
      setLoading(false);
      return null;
    }
  };

  /**
   * get the number of Documents
   * @returns the count as number
   */
  const count = async () => {
    setLoading(true);
    const snapshot = await getCountFromServer(collection(db, collectionName));
    const count = snapshot.data().count;
    setLoading(false);
    return count;
  };

  /**
   * Alias to refetch all.
   */
  const refreshData = () => {
    all();
  };

  // Initial call to fill 'data' with all documents when precache is active.
  useEffect(() => {
    if (precache) all();
    // eslint-disable-next-line
  }, []);

  return { data, loading, create, remove, update, all, getById, count, refreshData };
}
