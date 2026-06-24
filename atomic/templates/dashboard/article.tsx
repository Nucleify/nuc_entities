'use client'

import type { JSX } from 'react'
import { useMemo } from 'react'

import type { NucArticleObjectInterface, NucDashboardInterface } from 'nucleify'
import {
  articleRequests,
  type ConfirmDialogFunctionType,
  NucDialog,
  NucEntityDataTableCard,
  t,
  useArticleFields,
  useNucDialog,
} from 'nucleify'

type ArticleDashboardProps = Omit<NucDashboardInterface, 'data'> & {
  data: NucArticleObjectInterface[]
}

type DialogField = {
  name: string
  label: string
  type: string
  key: string
  props?: Record<string, unknown>
}

export function NucArticleDashboard({
  data,
  getData,
  loading,
}: ArticleDashboardProps): JSX.Element {
  const safeData = data ?? []
  const {
    visibleShow,
    visibleCreate,
    visibleEdit,
    visibleDelete,
    selectedObject,
    openDialog,
    closeDialog,
  } = useNucDialog()
  const { createAndEditFields, showFields } = useArticleFields()
  const { deleteArticle, storeArticle, editArticle } = articleRequests(
    closeDialog,
    'next'
  )

  const confirmCreate: ConfirmDialogFunctionType = async (data, getData) => {
    await storeArticle(
      data as unknown as NucArticleObjectInterface,
      async () => {
        getData?.()
      }
    )
  }

  const confirmEdit: ConfirmDialogFunctionType = async (data, getData) => {
    await editArticle(
      data as unknown as NucArticleObjectInterface,
      async () => {
        getData?.()
      }
    )
  }

  const confirmDelete: ConfirmDialogFunctionType = async (id, getData) => {
    if (typeof id !== 'number') return
    await deleteArticle(id, async () => {
      getData?.()
    })
  }

  const dialogs = useMemo(
    () => [
      {
        entity: 'article',
        action: 'show',
        visible: visibleShow,
        data: selectedObject ? [selectedObject] : undefined,
        cancelButtonLabel: t('common-close'),
        fields: showFields as unknown as DialogField[],
      },
      {
        entity: 'article',
        action: 'delete',
        visible: visibleDelete,
        title: t('entity-article-delete'),
        confirmButtonLabel: t('common-confirm'),
        cancelButtonLabel: t('common-cancel'),
        confirm: confirmDelete,
        getData,
      },
      {
        entity: 'article',
        action: 'create',
        visible: visibleCreate,
        title: t('entity-article-create'),
        confirmButtonLabel: t('common-confirm'),
        cancelButtonLabel: t('common-cancel'),
        confirm: confirmCreate,
        getData,
        fields: createAndEditFields as unknown as DialogField[],
      },
      {
        entity: 'article',
        action: 'edit',
        visible: visibleEdit,
        data: selectedObject ? [selectedObject] : undefined,
        title: t('entity-article-edit'),
        confirmButtonLabel: t('common-update'),
        cancelButtonLabel: t('common-cancel'),
        confirm: confirmEdit,
        getData,
        fields: createAndEditFields as unknown as DialogField[],
      },
    ],
    [
      confirmCreate,
      confirmDelete,
      confirmEdit,
      createAndEditFields,
      getData,
      selectedObject,
      showFields,
      visibleCreate,
      visibleDelete,
      visibleEdit,
      visibleShow,
    ]
  )

  return (
    <section id="articles">
      <NucEntityDataTableCard
        adType="article"
        value={safeData}
        loading={loading}
        openDialog={openDialog}
        tag={3}
        headerText={t('entity-article-manage')}
        buttonText={t('entity-article-new')}
      />

      {dialogs.map((dialog) => (
        <NucDialog
          key={dialog.action}
          entity={dialog.entity as ObjectNameType}
          action={dialog.action as ActionType}
          visible={dialog.visible}
          selectedObject={selectedObject as ObjectType}
          title={dialog.title}
          fields={dialog.fields}
          confirmButtonLabel={dialog.confirmButtonLabel}
          cancelButtonLabel={dialog.cancelButtonLabel}
          confirm={dialog.confirm}
          getData={dialog.getData}
          close={closeDialog}
          data={dialog.data as ObjectType[]}
          onHide={() => closeDialog(dialog.action as ActionType)}
        />
      ))}
    </section>
  )
}
