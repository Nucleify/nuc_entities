'use client'

import type {
  AppFramework,
  CloseDialogType,
  NucContactObjectInterface,
  NucContactRequestsInterface,
  UseLoadingInterface,
} from 'nucleify'
import {
  createEntityRequestState,
  createEntityRequestsCore,
  sessionStorageGetItem,
  useApiSuccess,
  useLoading,
} from 'nucleify'

const CONTACTS_URL = '/contacts'

export function contactRequests(
  close?: CloseDialogType,
  framework: AppFramework = 'nuxt'
): NucContactRequestsInterface {
  const { results, createdLastWeek, setResults, setCreatedLastWeek } =
    createEntityRequestState<NucContactObjectInterface>(framework)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  const { getAll, getCountByCreatedLastWeek, store, edit, remove } =
    createEntityRequestsCore<NucContactObjectInterface>({
      baseUrl: CONTACTS_URL,
      close,
      apiSuccess,
      setResults,
      setCreatedLastWeek,
      setLoading,
      mapStoreData: (data) => ({
        user_id: sessionStorageGetItem('user_id'),
        ...data,
      }),
    })

  return {
    results,
    createdLastWeek,
    loading,
    getAllContacts: getAll,
    getCountContactsByCreatedLastWeek: getCountByCreatedLastWeek,
    storeContact: store,
    editContact: edit,
    deleteContact: remove,
  }
}
