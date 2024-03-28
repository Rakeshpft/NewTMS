import React, { useEffect, useState } from "react";
import CommonLayOut from "../../layout";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import { useUserAdminRoleContext } from "../../services/reducer/userAdminRole.reducer";
import {
  IUserRoleFormState,
  initialUserRoleFormState,
} from "../user-role/userRole.types";
import { useUserContext } from "../../services/reducer/user.reducer";
import { IUserAdminRole } from "../../services/tms-objects/userAdminRole.types";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { toastify } from "../../features/notification/toastify";

const UserAdminRole = () => {
  const { getUserAdminRole, userAdminRole, postUserAdminRole } = useUserAdminRoleContext();
  const { userRole, getUserRole } = useUserContext();
  const [role, setRole] = useState<IUserRoleFormState>(initialUserRoleFormState);

  const [permissionList, setPermissionList] = useState<IUserAdminRole[]>([]);

  const handleInputChange = (prop: keyof IUserRoleFormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole({ ...role, [prop]: event.target.value });
  };

  const handleSave = async (event: { preventDefault: () => void }) => {
    event?.preventDefault();
    let response = await postUserAdminRole(permissionList);
    response && toastify({ message: response.message, type: (response.success ? "success" : "error") });
  }

  useEffect(() => {
    getUserAdminRole(role.role_id);
  }, [role.role_id]);

  useEffect(() => {
    getUserRole();
  }, []);

  useEffect(() => {
    setPermissionList(userAdminRole && userAdminRole?.length > 0 ? userAdminRole : []);
  }, [userAdminRole]);

  const [collapseItem, setCollapseItem] = useState<number[]>([]);
  const handleCollapse = (num: number) => {
    setCollapseItem([...collapseItem, num]);
    console.log(permissionList);
  }
  const handleExpand = (num: number) => {
    const filteredNumbers = collapseItem.filter((n) => n !== num);
    setCollapseItem(filteredNumbers);
  };
  const handleRead = (menu_id: number, status: boolean) => {
    var updatedList = updateMenuList(menu_id, status, false);
    setPermissionList(updatedList);
  }
  const handleWrite = (menu_id: number, status: boolean) => {
    var updatedList = updateMenuList(menu_id, status, true);
    setPermissionList(updatedList);
  }
  const updateMenuList = (menu_id: number, status: boolean, write: boolean): IUserAdminRole[] => {
    var updatedList = permissionList.map((item) => (item.menu_id == menu_id ? { ...item, is_read: (write && !status ? item.is_read : status), is_write: (write || !status ? status : item.is_write) } : item));
    var childs = permissionList.filter(l => l.parent_menu_id == menu_id)?.length;
    updatedList = childs > 0 ? updateMenuChild(updatedList, menu_id, status, write) : updatedList;
    var parent_menu_id = updatedList.filter(l => l.menu_id == menu_id)[0].parent_menu_id;
    updatedList = parent_menu_id > 0 ? updateMenuParent(updatedList, parent_menu_id, status, write) : updatedList;
    return updatedList;
  }
  const updateMenuChild = (list: IUserAdminRole[], menu_id: number, status: boolean, write: boolean): IUserAdminRole[] => {
    var updatedList = list.map((item) => (item.parent_menu_id == menu_id ? { ...item, is_read: (write && !status ? item.is_read : status), is_write: (write || !status ? status : item.is_write) } : item));
    var childs = updatedList.filter(l => l.parent_menu_id == menu_id)?.length;
    childs > 0 && updatedList.filter(l => l.parent_menu_id == menu_id).map((item) => { updatedList = updateMenuChild(updatedList, item.menu_id, status, write); });
    return updatedList;
  }
  const updateMenuParent = (list: IUserAdminRole[], menu_id: number, status: boolean, write: boolean): IUserAdminRole[] => {
    var checkedRead = list.filter(l => l.parent_menu_id == menu_id && l.is_read).length;
    var checkedWrite = list.filter(l => l.parent_menu_id == menu_id && l.is_write).length;
    var totalLength = list.filter(l => l.parent_menu_id == menu_id).length;
    var updatedList = (status && totalLength == checkedWrite) || (!status && checkedWrite < totalLength) ? list.map((item) => (item.menu_id == menu_id ? { ...item, is_write: status } : item)) : list;
    var updatedList = (status && totalLength == checkedRead) || (!status && checkedRead < totalLength) ? updatedList.map((item) => (item.menu_id == menu_id ? { ...item, is_read: status } : item)) : updatedList;
    var parent_menu_id = updatedList.filter(l => l.menu_id == menu_id)[0].parent_menu_id;
    updatedList = parent_menu_id > 0 ? updateMenuParent(updatedList, parent_menu_id, status, write) : updatedList;
    return updatedList;
  }

  const getMenu = () => {
    return permissionList.filter(l => l.parent_menu_id == 0)?.map((item) => {
      return getMenuItem(item, 0);
    });
  }

  const getMenuItem = (menuItem: IUserAdminRole, level: number) => {
    var childs = permissionList.filter(l => l.parent_menu_id == menuItem.menu_id)?.length;
    return (
      <>
        <Col lg={12}>
          <Row>
            <Col xs={8}>
              {level > 0 && <img src={require("../../../public/images/vertical.gif")} height="100%" />}
              {level > 1 && <img src={require("../../../public/images/vertical.gif")} height="100%" />}
              <img src={require("../../../public/images/hr.gif")} height="100%" />
              {collapseItem?.includes(menuItem.menu_id) && childs > 0 && <a><AiFillPlusCircle size={24} color="var(--bs-primary)" onClick={() => { handleExpand(menuItem.menu_id) }} /></a>}
              {!collapseItem?.includes(menuItem.menu_id) && childs > 0 && <a><AiFillMinusCircle size={24} color="var(--bs-primary)" onClick={() => { handleCollapse(menuItem.menu_id) }} /></a>}
              <Label className="ms-2"> {menuItem.menu_name} </Label>
            </Col>
            <Col xs={4} className="text-center">
              <Row>
                <Col xs={6}>
                  <FormGroup check inline className="me-0">
                    <Input type="checkbox" disabled={menuItem.company_id == 0} value={menuItem.menu_id} checked={menuItem.is_read} onChange={() => { handleRead(menuItem.menu_id, !menuItem.is_read) }} />
                  </FormGroup>
                </Col>
                <Col xs={6}>
                  <FormGroup check inline className="me-0">
                    <Input type="checkbox" disabled={menuItem.company_id == 0} value={menuItem.menu_id} checked={menuItem.is_write} onChange={() => { handleWrite(menuItem.menu_id, !menuItem.is_write); }} />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>

          {
            childs > 0 && (
              <Row className={`submenu ` + (collapseItem?.includes(menuItem.menu_id) ? `d-none` : ``)}>
                {permissionList.filter(l => l.parent_menu_id == menuItem.menu_id)?.map((item) => {
                  return getMenuItem(item, level + 1);
                })}
              </Row>
            )
          }
        </Col>
      </>
    );
  }

  return (
    <CommonLayOut>
      <div className="page-content header-sticky">
        <div className="page-title">User Role Permission Manager</div>
        <Row>
          <Col lg={6} md={10} sm={12}>
            <Row>
              <Col lg={6} md={8} sm={10} xs={10}>
                <Label> Role </Label>
                <FormGroup>
                  <Input
                    bsSize="sm"
                    className="form-control form-control-sm"
                    type="select"
                    id="user"
                    name="user"
                    value={role.role_id}
                    onChange={handleInputChange("role_id")}
                  >
                    <option value={0}>Select Role</option>
                    {userRole?.map((item) => {
                      return (
                        <option key={item.role_id} value={item.role_id}>
                          {item.role_name}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
              </Col>
              <Col lg={6} md={4} sm={2} xs={2}>
                <Label> &nbsp;</Label><br />
                <FormGroup>
                <Button type="button" size="sm" color="primary" onClick={handleSave}>Save</Button>
                </FormGroup>
              </Col>
            </Row>
            {role.role_id > 0 ? (
              <Row className="border-bottom fw-bold mb-2">
                <Col xs={8}>
                  <Label> Section </Label>
                </Col>
                <Col xs={4} className="text-center">
                  <Row>
                    <Col xs={12}>
                      <Label> Permissions </Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={6}>
                      <Label> Read </Label>
                    </Col>
                    <Col xs={6}>
                      <Label> Write </Label>
                    </Col>
                  </Row>
                </Col>
              </Row>
            ) : null}
          </Col>
        </Row>
      </div>
      <div className="page-content">
        <Row>
          <Col lg={6} md={10} sm={12}>
            {role.role_id > 0 ? (
              <Row className="permission-menu">
                {getMenu()}
              </Row>
            ) : null}
          </Col>
        </Row>
      </div>
    </CommonLayOut>
  );
};

export default UserAdminRole;