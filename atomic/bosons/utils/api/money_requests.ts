'use client'

import type {
  AppFramework,
  CloseDialogType,
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

const MONEY_URL = '/money'

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
