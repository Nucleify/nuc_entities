'use client'

import type {
  AppFramework,
  CloseDialogType,
  NucArticleObjectInterface,
  NucArticleRequestsInterface,
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
