import type {
  DeleteEntityRequestType,
  EditEntityRequestType,
  EntityCountResultsType,
  EntityResultsType,
  GetAllEntitiesRequestType,
  GetEntityRequestType,
  LoadingType,
  NucArticleObjectInterface,
  StoreEntityRequestType,
} from 'nucleify'

export interface NucArticleRequestsInterface {
  results: EntityResultsType<NucArticleObjectInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingType
  getAllArticles: GetAllEntitiesRequestType<NucArticleObjectInterface>
  getCountArticlesByCreatedLastWeek: GetEntityRequestType
  storeArticle: StoreEntityRequestType<NucArticleObjectInterface>
  editArticle: EditEntityRequestType<NucArticleObjectInterface>
  deleteArticle: DeleteEntityRequestType
}
