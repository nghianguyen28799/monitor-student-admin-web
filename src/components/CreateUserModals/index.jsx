/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TextField from '@material-ui/core/TextField';

import './CreateUserModals.css'
const ModalExample = (props) => {
  const {
    className,
    toggle,
    modal
  } = props;

  const generate_string = (n=8) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < n; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  return (
    <div>
      <Modal isOpen={modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
        toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Tạo tài khoản người dùng</ModalHeader>
        <ModalBody> 
          <div className="modals">
            <div className="text-field-modals">
                <TextField id="outlined-basic" label="Tên tài khoản" variant="outlined" />
            </div>
            <div className="text-field-modals">
              <TextField
                  id="filled-password-input"
                  label="Mật khẩu"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
              />
            </div>
            <div className="text-field-modals">
                <TextField id="outlined-basic" label="Email" variant="outlined" />
            </div>
            <div className="text-field-modals">
                <TextField id="outlined-basic" label="Họ và tên" variant="outlined" />
            </div>
            <div className="text-field-modals">
                <TextField id="outlined-basic" label="Số điện thoại" variant="outlined" />
            </div>
            <div className="text-field-modals">
                <TextField id="outlined-basic" label="Địa chỉ" variant="outlined" />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExample;