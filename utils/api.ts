'use client'

import type {
  AppFramework,
  CloseDialogType,
  NucArticleObjectInterface,
  NucArticleRequestsInterface,
  NucContactObjectInterface,
  NucContactRequestsInterface,
  NucMoneyObjectInterface,
  NucMoneyRequestsInterface,
  UseLoadingInterface,
} from 'nucleify'
import {
  createEntityRequestState,
  createEntityRequestsCore,
  sessionStorageGetItem,
  useApiSuccess,
  useLoading,
} from 'nucleify'

const ARTICLES_URL = '/articles'
const CONTACTS_URL = '/contacts'
const MONEY_URL = '/money'

export function articleRequests(
  close?: CloseDialogType,
  framework: AppFramework = 'nuxt'
): NucArticleRequestsInterface {
  const { results, createdLastWeek, setResults, setCreatedLastWeek } =
    createEntityRequestState<NucArticleObjectInterface>(framework)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  const { getAll, getCountByCreatedLastWeek, store, edit, remove } =
    createEntityRequestsCore<NucArticleObjectInterface>({
      baseUrl: ARTICLES_URL,
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
    getAllArticles: getAll,
    getCountArticlesByCreatedLastWeek: getCountByCreatedLastWeek,
    storeArticle: store,
    editArticle: edit,
    deleteArticle: remove,
  }
}

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

export function moneyRequests(
  close?: CloseDialogType,
  framework: AppFramework = 'nuxt'
): NucMoneyRequestsInterface {
  const { results, createdLastWeek, setResults, setCreatedLastWeek } =
    createEntityRequestState<NucMoneyObjectInterface>(framework)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  const { getAll, getCountByCreatedLastWeek, store, edit, remove } =
    createEntityRequestsCore<NucMoneyObjectInterface>({
      baseUrl: MONEY_URL,
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
    getAllMoney: getAll,
    getCountMoneyByCreatedLastWeek: getCountByCreatedLastWeek,
    storeMoney: store,
    editMoney: edit,
    deleteMoney: remove,
  }
}
2
