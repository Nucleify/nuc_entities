'use client'

import type { JSX } from 'react'
import { useMemo } from 'react'

import type { NucDashboardInterface, NucMoneyObjectInterface } from 'nucleify'
import {
  type ConfirmDialogFunctionType,
  moneyRequests,
  NucDialog,
  NucEntityDataTableCard,
  t,
  useMoneyFields,
  useNucDialog,
} from 'nucleify'

type MoneyDashboardProps = Omit<NucDashboardInterface, 'data'> & {
  data: NucMoneyObjectInterface[]
}

type DialogField = {
  name: string
  label: string
  type: string
  key: string
  props?: Record<string, unknown>
}

export function NucMoneyDashboard({
  data,
  getData,
  loading,
}: MoneyDashboardProps): JSX.Element {
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
  const { createAndEditFields, showFields } = useMoneyFields()
  const { deleteMoney, storeMoney, editMoney } = moneyRequests(
    closeDialog,
    'next'
  )

  const confirmCreate: ConfirmDialogFunctionType = async (data, getData) => {
    await storeMoney(data as unknown as NucMoneyObjectInterface, async () => {
      getData?.()
    })
  }

  const confirmEdit: ConfirmDialogFunctionType = async (data, getData) => {
    await editMoney(data as unknown as NucMoneyObjectInterface, async () => {
      getData?.()
    })
  }

  const confirmDelete: ConfirmDialogFunctionType = async (id, getData) => {
    if (typeof id !== 'number') return
    await deleteMoney(id, async () => {
      getData?.()
    })
  }

  const dialogs = useMemo(
    () => [
      {
        entity: 'money',
        action: 'show',
        visible: visibleShow,
        data: selectedObject ? [selectedObject] : undefined,
        cancelButtonLabel: t('common-close'),
        fields: showFields as unknown as DialogField[],
      },
      {
        entity: 'money',
        action: 'delete',
        visible: visibleDelete,
        title: t('entity-money-delete'),
        confirmButtonLabel: t('common-confirm'),
        cancelButtonLabel: t('common-cancel'),
        confirm: confirmDelete,
        getData,
      },
      {
        entity: 'money',
        action: 'create',
        visible: visibleCreate,
        title: t('entity-money-create'),
        confirmButtonLabel: t('common-confirm'),
        cancelButtonLabel: t('common-cancel'),
        confirm: confirmCreate,
        getData,
        fields: createAndEditFields as unknown as DialogField[],
      },
      {
        entity: 'money',
        action: 'edit',
        visible: visibleEdit,
        data: selectedObject ? [selectedObject] : undefined,
        title: t('entity-money-edit'),
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
    <section id="money">
      <NucEntityDataTableCard
        adType="money"
        value={safeData}
        loading={loading}
        openDialog={openDialog}
        tag={3}
        headerText={t('entity-money-manage')}
        buttonText={t('entity-money-new')}
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
