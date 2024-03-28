import React, { useState } from 'react';

function RoleCheckbox({ isAdmin, onCheckboxChange }) {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isAdmin}
          onChange={onCheckboxChange}
        />
        Admin
      </label>
    </div>
  );
}

export default RoleCheckbox;