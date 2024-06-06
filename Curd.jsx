import React, { useEffect, useState } from "react";
import "./Curd.css";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const Curd = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [record, setRecord] = useState([]);
  const [editId, setEditId] = useState("");
  const [multipleDelete, setMultipleDelete] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : [];
    setRecord(data);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "" || phone === "") {
      toast.error("all field is requird...!");
      return;
    }

    if (editId) {
      let recordn = [...record];
      let recordupdate = recordn.map((val) => {
        if (val.id === editId) {
          return {
            ...val,
            name: name,
            phone: phone,
          };
        }
        return val;
      });

      localStorage.setItem("user", JSON.stringify(recordupdate));
      setRecord(recordupdate);
      setEditId("");
      toast.success("task update successfully...!");
    } else {
      const newId = record.length ? record[record.length - 1].id + 1 : 8;
      const recordn = [...record, { id: newId, name, phone }];
      localStorage.setItem("user", JSON.stringify(recordn));
      setRecord(recordn);
      toast.success("task add");
    }

    setName("");
    setPhone("");
  };

  const deleteData = (id) => {
    let recordupdate = record.filter((val) => val.id !== id);
    localStorage.setItem("user", JSON.stringify(recordupdate));
    setRecord(recordupdate);
  };

  const editData = (id) => {
    let editItem = record.find((val) => val.id === id);
    setEditId(editItem.id);
    setName(editItem.name);
    setPhone(editItem.phone);
  };

  const handleCheckbox = (id, checked) => {
    let updatedMultipleDelete = [...multipleDelete];
    if (checked) {
      updatedMultipleDelete.push(id);
    } else {
      updatedMultipleDelete = updatedMultipleDelete.filter((val) => val !== id);
    }
    setMultipleDelete(updatedMultipleDelete);
  };

  const handleAllDelete = () => {
    if (multipleDelete.length > 0) {
      let recordupdate = record.filter((val) => !multipleDelete.includes(val.id));
      localStorage.setItem("user", JSON.stringify(recordupdate));
      setRecord(recordupdate);
      setMultipleDelete([]);
      toast("Deleted successfully...!");
    } else {
      toast.success("Select at least one row .......!");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form"style={{border:"1px solid black",width:"500px",margin:"50px auto",boxShadow:"2px 2px 4px",padding:"10px"}}>
        <h1 align="center"> add task</h1>
        <label htmlFor="">task</label>
        <input type="text"id="name" onChange={(e) => setName(e.target.value)}value={name}placeholder="Add task" style={{ width: "300px", padding: "10px", marginBottom: "20px" }}
        /><br></br>
        <label htmlFor="">status</label>
        <input  type="text"   id="phone" onChange={(e) => setPhone(e.target.value)}  value={phone}  placeholder="Add status"  style={{ width: "300px", padding: "10px", marginBottom: "20px" }}
        /><br></br>
        <button type="submit" style={{  padding: "8px 16px",backgroundColor: "green", color: "#fff",  border: "none", marginBottom: "30px",height: "40px",
          }}
        >
          {editId ? "Edit" : "ADD TASK"}
        </button>
      </form>
      <h1 align="center"> TODO list</h1>
      <table style={{ width: "100%", border: "3px solid black",backgroundColor:"white" }}>
      
        <thead style={{backgroundColor:"rgb(207 226 255)"}}>
          <tr className="trw">
        
            <th style={{ border: "1px solid #000000", padding: "12px",color:"rgb(81 150 254)"}}>task</th>
            <th style={{ border: "1px solid #000000", padding: "12px",color:"rgb(81 150 254)" }}>status</th>
            <th style={{ border: "1px solid #000000", padding: "12px",color:"rgb(81 150 254)" }}>Action</th>
            <th style={{ border: "1px solid #000000", padding: "12px" }}>
              <button onClick={handleAllDelete} style={{border:"none",color:"rgb(81 150 254)"}}> Delete</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {record.map((item) => {
            const { id, name, phone } = item;
            return (
              <tr key={id}>
           
                <td style={{ border: "1px solid #000000", padding: "12px" }}>{name}</td>
                <td style={{ border: "1px solid #000000", padding: "12px" }}>{phone}</td>
                <td style={{ border: "1px solid #000000", padding: "12px" }}>
                  <button onClick={() => deleteData(id)}style={{backgroundColor:"red",border:"none",padding:"5px"}}>Delete</button>
                  <button onClick={() => editData(id)}style={{backgroundColor:"green",border:"none",margin:"5px",padding:"5px"}}>Edit</button>
                </td>
                <td style={{ border: "1px solid #000000", padding: "12px" }}>
                  <input
                    type="checkbox"
                    onChange={(e) => handleCheckbox(id, e.target.checked)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default Curd;
