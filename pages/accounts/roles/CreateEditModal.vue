<script setup lang="ts">
import { actions } from '@configs/actions';

import { roleFields as updateFields } from '@/utils/form/update-fields';

const { updateDtRowData } = inject(DtUtils.key) as InstanceType<typeof DtUtils>;
const { id, show, isAdd, isEdit, setLoading, setSpinner, setTitle, setModal } = inject(
  useModalKey,
) as ModalProps;

setTitle('角色權限');

const {
  create,
  set,
  getTable,
  get,
  getRoleCheckList,
  showCheckbox,
  createPermission,
  setPermission,
} = useRole();
const { permissionData } = storeToRefs(useRole());

const { handleSubmit, resetForm, setFieldValue } = useForm({
  validationSchema: { Code: 'required', Name: 'required' },
});

const roleMenus = ref();

watch([show, id], async ([isShow, id]) => {
  permissionData.value = [];

  if (!isShow) return;

  setLoading(true);

  roleMenus.value = getRoleCheckList();

  if (!id) {
    setLoading(false);

    return;
  }

  const res = await get(id);

  roleMenus.value = getRoleCheckList();

  const { formUpdate } = useFormUpdate(updateFields, setFieldValue);

  formUpdate(res);
  setLoading(false);
});

const onSubmit = handleSubmit(async values => {
  setSpinner(true);

  const { user } = storeToRefs(useAuth());

  const otherParams = {
    UUID_Entry: user.value.entry,
    Sorting: null,
    Display: 'Y',
    Level: null,
    Active: 'Y',
    RoleEntryInfo: { Active: 'Y' },
  };

  if (isAdd.value) {
    const data = [{ ...values, ...otherParams }];

    const res = await create(data);

    if (!res) return;

    await createPermission(res?.UUID as string, roleMenus.value);

    getTable();
  }

  if (isEdit.value) {
    const data = [{ ...values, UUID: id.value, ...otherParams }];

    const [res] = await Promise.all([set(data), setPermission(roleMenus.value)]);

    updateDtRowData(res);
  }

  setModal(false);
  setSpinner(false);
});

function toggleMenu(menu: Record<string, any>) {
  Object.keys(menu.permissions).forEach((key: string) => {
    menu.permissions[key] = showCheckbox(menu, key) ? (menu.selected ? 'Y' : 'N') : 'N';
  });
}

function toggleMenuSelect(menu: Record<string, any>) {
  const enabledActions = actions
    .map(action => action.value)
    .filter(actionValue => showCheckbox(menu, actionValue));

  menu.selected = enabledActions.every(actionValue => menu.permissions[actionValue] === 'Y');
}

function onAfterLeave() {
  resetForm();

  roleMenus.value = [];
}
</script>

<template>
  <Modal width="1000px" @hide="onAfterLeave">
    <template #content>
      <q-form id="create-edit-form" @submit="onSubmit">
        <div class="row q-px-sm">
          <div class="col-12">
            <h6 class="form-title q-my-none q-mb-sm">一般設定</h6>
            <div class="row">
              <div class="col-12 col-md-6">
                <TextField label="角色編號" name="Code" />

                <TextField label="角色名稱" name="Name" />
              </div>

              <div class="col-12 col-md-6 q-pl-md-md">
                <TextField type="textarea" label="備註" name="Memo" />
              </div>
            </div>
          </div>

          <div class="col-12">
            <h6 class="form-title q-my-none">權限設定</h6>

            <div class="row items-center bg-grey-3 q-pa-sm">
              <div class="col-3 text-bold q-px-md">選單</div>
              <div class="col row">
                <div
                  v-for="{ label, value } in actions"
                  :key="value"
                  class="col text-center text-bold"
                >
                  {{ label }}
                </div>
              </div>
            </div>

            <q-list bordered>
              <template v-for="menu in roleMenus" :key="menu.menuId">
                <q-item v-if="!menu.children">
                  <q-item-section class="w-100">
                    <div class="row items-center">
                      <div class="col-3">
                        <q-checkbox
                          v-model="menu.selected"
                          :label="menu.label"
                          color="grey-5"
                          @update:model-value="toggleMenu(menu)"
                        />
                      </div>

                      <div class="col row">
                        <div
                          v-for="{ value } in actions"
                          :key="value"
                          class="col flex items-center justify-center"
                        >
                          <template v-if="showCheckbox(menu, value)">
                            <q-checkbox
                              v-model="menu.permissions[value]"
                              true-value="Y"
                              false-value="N"
                              color="grey-5"
                              @update:model-value="toggleMenuSelect(menu)"
                            />
                          </template>

                          <template v-else> -- </template>
                        </div>
                      </div>
                    </div>
                  </q-item-section>
                </q-item>

                <q-expansion-item v-else expand-separator :label="menu.label" default-opened>
                  <q-item>
                    <q-item-section class="w-100">
                      <div
                        v-for="child in menu.children"
                        :key="child.menuId"
                        class="row items-center q-py-xs"
                      >
                        <div class="col-3">
                          <q-checkbox
                            v-model="child.selected"
                            :label="child.label"
                            color="grey-5"
                            @update:model-value="toggleMenu(child)"
                          />
                        </div>

                        <div class="col row">
                          <div
                            v-for="{ value } in actions"
                            :key="value"
                            class="col flex items-center justify-center"
                          >
                            <template v-if="showCheckbox(child, value)">
                              <q-checkbox
                                v-model="child.permissions[value]"
                                true-value="Y"
                                false-value="N"
                                color="grey-5"
                                @update:model-value="toggleMenuSelect(child)"
                              />
                            </template>

                            <template v-else> -- </template>
                          </div>
                        </div>
                      </div>
                    </q-item-section>
                  </q-item>
                </q-expansion-item>
              </template>
            </q-list>
          </div>
        </div>
      </q-form>
    </template>
  </Modal>
</template>
