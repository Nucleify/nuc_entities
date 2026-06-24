import type {
  DeleteEntityRequestType,
  EditEntityRequestType,
  EntityCountResultsType,
  EntityResultsType,
  GetAllEntitiesRequestType,
  GetEntityRequestType,
  LoadingType,
  NucContactObjectInterface,
  StoreEntityRequestType,
} from 'nucleify'

export interface NucContactRequestsInterface {
  results: EntityResultsType<NucContactObjectInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingType
  getAllContacts: GetAllEntitiesRequestType<NucContactObjectInterface>
  getCountContactsByCreatedLastWeek: GetEntityRequestType
  storeContact: StoreEntityRequestType<NucContactObjectInterface>
  editContact: EditEntityRequestType<NucContactObjectInterface>
  deleteContact: DeleteEntityRequestType
}
