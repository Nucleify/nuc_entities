<template>
  <section id="money">
    <nuc-entity-datatable-card
      :value="data"
      :loading="loading"
      :open-dialog="openDialog"
      :tag="3"
      ad-type="money"
      :header-text="t('entity-money-manage')"
      :button-text="t('entity-money-new')"
    />

    <nuc-dialog
      v-for="dialog in dialogs"
      :key="dialog.action"
      :entity="dialog.entity"
      :action="dialog.action"
      :visible="dialog.visible"
      :selected-object="selectedObject"
      :title="dialog.title"
      :fields="dialog.fields"
      :confirm-button-label="dialog.confirmButtonLabel"
      :cancel-button-label="dialog.cancelButtonLabel"
      :confirm="dialog.confirm"
      :get-data="dialog.getData"
      :close="closeDialog"
    />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { NucDashboardInterface } from 'atomic'
import { moneyRequests, useMoneyFields, useNucDialog } from 'atomic'

const props = defineProps<NucDashboardInterface>()
const { t } = useI18n()

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
const { deleteMoney, storeMoney, editMoney } = moneyRequests(closeDialog)

const dialogs = computed(() => [
  {
    entity: 'money',
    action: 'show',
    visible: visibleShow.value,
    data: selectedObject.value,
    cancelButtonLabel: t('common-close'),
    fields: showFields,
  },
  {
    entity: 'money',
    action: 'delete',
    visible: visibleDelete.value,
    selectedObject: selectedObject.value,
    title: t('entity-money-delete'),
    confirmButtonLabel: t('common-confirm'),
    cancelButtonLabel: t('common-cancel'),
    confirm: deleteMoney,
    getData: props.getData,
  },
  {
    entity: 'money',
    action: 'create',
    visible: visibleCreate.value,
    title: t('entity-money-create'),
    confirmButtonLabel: t('common-confirm'),
    cancelButtonLabel: t('common-cancel'),
    confirm: storeMoney,
    getData: props.getData,
    fields: createAndEditFields,
  },
  {
    entity: 'money',
    action: 'edit',
    visible: visibleEdit.value,
    data: selectedObject.value,
    title: t('entity-money-edit'),
    confirmButtonLabel: t('common-update'),
    cancelButtonLabel: t('common-cancel'),
    confirm: editMoney,
    getData: props.getData,
    fields: createAndEditFields,
  },
])
</script>
