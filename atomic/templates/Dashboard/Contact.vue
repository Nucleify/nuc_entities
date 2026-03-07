<template>
  <section id="contacts">
    <nuc-entity-datatable-card
      ad-type="contact"
      :value="data"
      :loading="loading"
      :open-dialog="openDialog"
      :tag="3"
      :header-text="t('entity-contact-manage')"
      :button-text="t('entity-contact-new')"
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

import type { NucDashboardInterface } from 'nucleify'
import { contactRequests, useContactFields, useNucDialog } from 'nucleify'

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

const { createAndEditFields, showFields } = useContactFields()
const { deleteContact, storeContact, editContact } =
  contactRequests(closeDialog)

const dialogs = computed(() => [
  {
    entity: 'contact',
    action: 'show',
    visible: visibleShow.value,
    data: selectedObject.value,
    cancelButtonLabel: t('common-close'),
    fields: showFields,
  },
  {
    entity: 'contact',
    action: 'delete',
    visible: visibleDelete.value,
    selectedObject: selectedObject.value,
    title: t('entity-contact-delete'),
    confirmButtonLabel: t('common-confirm'),
    cancelButtonLabel: t('common-cancel'),
    confirm: deleteContact,
    getData: props.getData,
  },
  {
    entity: 'contact',
    action: 'create',
    visible: visibleCreate.value,
    title: t('entity-contact-create'),
    confirmButtonLabel: t('common-confirm'),
    cancelButtonLabel: t('common-cancel'),
    confirm: storeContact,
    getData: props.getData,
    fields: createAndEditFields,
  },
  {
    entity: 'contact',
    action: 'edit',
    visible: visibleEdit.value,
    data: selectedObject.value,
    title: t('entity-contact-edit'),
    confirmButtonLabel: t('common-update'),
    cancelButtonLabel: t('common-cancel'),
    confirm: editContact,
    getData: props.getData,
    fields: createAndEditFields,
  },
])
</script>
