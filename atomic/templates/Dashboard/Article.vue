<template>
  <section id="articles">
    <nuc-entity-datatable-card
      ad-type="article"
      :value="data"
      :loading="loading"
      :open-dialog="openDialog"
      :tag="3"
      :header-text="t('entity-article-manage')"
      :button-text="t('entity-article-new')"
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
import { articleRequests, useArticleFields, useNucDialog } from 'atomic'

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

const { createAndEditFields, showFields } = useArticleFields()
const { deleteArticle, storeArticle, editArticle } =
  articleRequests(closeDialog)

const dialogs = computed(() => [
  {
    entity: 'article',
    action: 'show',
    visible: visibleShow.value,
    data: selectedObject.value,
    cancelButtonLabel: t('common-close'),
    fields: showFields,
  },
  {
    entity: 'article',
    action: 'delete',
    visible: visibleDelete.value,
    selectedObject: selectedObject.value,
    title: t('entity-article-delete'),
    confirmButtonLabel: t('common-confirm'),
    cancelButtonLabel: t('common-cancel'),
    confirm: deleteArticle,
    getData: props.getData,
  },
  {
    entity: 'article',
    action: 'create',
    visible: visibleCreate.value,
    title: t('entity-article-create'),
    confirmButtonLabel: t('common-confirm'),
    cancelButtonLabel: t('common-cancel'),
    confirm: storeArticle,
    getData: props.getData,
    fields: createAndEditFields,
  },
  {
    entity: 'article',
    action: 'edit',
    visible: visibleEdit.value,
    data: selectedObject.value,
    title: t('entity-article-edit'),
    confirmButtonLabel: t('common-update'),
    cancelButtonLabel: t('common-cancel'),
    confirm: editArticle,
    getData: props.getData,
    fields: createAndEditFields,
  },
])
</script>
