import React from 'react'
import { MdDeleteForever } from 'react-icons/md';

const tableHeaderItems = [ "Name", "Phone", "Address", "" ]

const ContactsTable = ({ contacts, setContactList, handleContactDelete }) => {
  return (
    <table className="min-w-[80%]" >
      <thead className="bg-indigo-600 text-white " >
        <tr className='p-4 ' >
          { tableHeaderItems.map(headerItem => (
            <th key={headerItem} > {headerItem} </th>
          )) }
        </tr>
      </thead>
      <tbody>
        { contacts?.map(contact => (
          <tr key={contact.id} className='text-center bg-gray-50' >
            <td className='p-1' > {contact.name} </td>
            <td> {contact.phoneNumber} </td>
            <td> {contact.address} </td>
            <td onClick={() => {
              const filteredContactList = contacts.filter(item => item.id !== contact.id)
              setContactList(filteredContactList);
              handleContactDelete(contact);
            }} className='text-red-500 font-semibold text-xl hover:text-red-600 hover:cursor-pointer bg-gray-100'>
              <MdDeleteForever />
            </td>
          </tr>
        )) }
      </tbody>
      <tfoot></tfoot>
    </table>
  )
}

export default ContactsTable;