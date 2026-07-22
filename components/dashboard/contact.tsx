'use client'

import type { JSX } from 'react'
import { useMemo } from 'react'

import type { NucContactObjectInterface, NucDashboardInterface } from 'nucleify'
import {
  type ConfirmDialogFunctionType,
  contactRequests,
  NucDialog,
  NucEntityDataTableCard,
  t,
  useContactFields,
  useNucDialog,
} from 'nucleify'

type ContactDashboardProps = Omit<NucDashboardInterface, 'data'> & {
  data: NucContactObjectInterface[]
}

type DialogField = {
  name: string
  label: string
  type: string
  key: string
  props?: Record<string, unknown>
}

export function NucContactDashboard({
  data,
  getData,
  loading,
}: ContactDashboardProps): JSX.Element {
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
  const { createAndEditFields, showFields } = useContactFields()
  const { deleteContact, storeContact, editContact } = contactRequests(
    closeDialog,
    'next'
  )

  const confirmCreate: ConfirmDialogFunctionType = async (data, getData) => {
    await storeContact(
      data as unknown as NucContactObjectInterface,
      async () => {
        getData?.()
      }
    )
  }

  const confirmEdit: ConfirmDialogFunctionType = async (data, getData) => {
    await editContact(
      data as unknown as NucContactObjectInterface,
      async () => {
        getData?.()
      }
    )
  }

  const confirmDelete: ConfirmDialogFunctionType = async (id, getData) => {
    if (typeof id !== 'number') return
    await deleteContact(id, async () => {
      getData?.()
    })
  }

  const dialogs = useMemo(
    () => [
      {
        entity: 'contact',
        action: 'show',
        visible: visibleShow,
        data: selectedObject ? [selectedObject] : undefined,
        cancelButtonLabel: t('common-close'),
        fields: showFields as unknown as DialogField[],
      },
      {
        entity: 'contact',
        action: 'delete',
        visible: visibleDelete,
        title: t('entity-contact-delete'),
        confirmButtonLabel: t('common-confirm'),
        cancelButtonLabel: t('common-cancel'),
        confirm: confirmDelete,
        getData,
      },
      {
        entity: 'contact',
        action: 'create',
        visible: visibleCreate,
        title: t('entity-contact-create'),
        confirmButtonLabel: t('common-confirm'),
        cancelButtonLabel: t('common-cancel'),
        confirm: confirmCreate,
        getData,
        fields: createAndEditFields as unknown as DialogField[],
      },
      {
        entity: 'contact',
        action: 'edit',
        visible: visibleEdit,
        data: selectedObject ? [selectedObject] : undefined,
        title: t('entity-contact-edit'),
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
    <section id="contacts">
      <NucEntityDataTableCard
        nuiType="contact"
        value={safeData}
        loading={loading}
        openDialog={openDialog}
        tag={3}
        headerText={t('entity-contact-manage')}
        buttonText={t('entity-contact-new')}
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
