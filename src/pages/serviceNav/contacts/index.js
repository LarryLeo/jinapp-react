import React, { Component } from "react";
import { ContactList } from "./style";
import { requestGet } from "../../../utils/utils";
export default class Contacts extends Component {
  state = {
    contacts: []
  };
  fetchContacts = async () => {
    let res = await requestGet({
      apiUrl: "/app/v1/index/getServicePhoneList"
    });
    res.success &&
      this.setState({
        contacts: res.data.list
      });
  };
  componentDidMount() {
    this.fetchContacts();
  }
  render() {
    return (
      <ContactList>
        <ul  className="contactList">
          {this.state.contacts.map(item => (
            <li key={item.id} className="listItem">
              <span className="name">{item.contact}</span>
              <span className="unit">{item.unit_name}</span>
              <img
                style={{ width: 24, height: 24 }}
                src="http://jz.test.chimukeji.com/assets/web/img/icon-phone.png"
                alt=""
              />
            </li>
          ))}
        </ul>
      </ContactList>
    );
  }
}
