import { useState, useEffect } from "react";
// import "./App.css";
import "./table.css"
import * as React from "react";
// import { useTable, useSortBy } from "react-table";
import { useTable, Column } from "react-table";
import ViewTable from "./ViewTable";
import { type } from "os";
import MovieDetails from "./MovieDetails";
import { Button, Modal, Form, Input } from 'antd';
import type { SizeType } from "antd/es/config-provider/SizeContext";
import useHistory from 'react-router-dom';


function MovieTable(){
  interface Data {
    id?: number;
    title?: string;
    duration?: number;
    staring?: string;
    category?: string;
    release_date?: number;
  }
  
  
    const [data, setData] = React.useState<Data[]>([]);
    const columns = React.useMemo(
      () => [
        // {
        //   Header: "ID",
        //   accessor: "id",
        // },
        {
          Header: "Title",
          accessor: "title",
        },
        {
          Header: "Duration",
          accessor: "duration",
        },
        {
          Header: "Starring",
          accessor: "staring",
        },
        {
          Header: "Category",
          accessor: "category",
        },
        {
          Header: "Actions",
          accessor: "action",
          Cell: ({ row }: { row:any }) => (
                      <>
                        <button onClick={() => showViewModal(row.original)}>View</button>
                        <button onClick={() => handleDeleteClick(row)}>Delete</button>
                      </>
                    ),
        },
      ],
      []
    );
  
    React.useEffect(() => {
      fetch("https://localhost:44311/api/services/app/Movie/GetAll")
        .then((response) => response.json())
        .then((data) => setData(data.result));
    }, []);


    //SEARCHING STATE VARIABLE
  const [searchText, setSearchText] = useState('');
  
  //FILTERED DATA VARIABLE
  const [filteredData, setFilteredData] = useState<Data[]>(data);
  
  //HANDLE SEARCH FUNCTION
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    }  = useTable({ columns, data: filteredData});


//UPDATE FILTERED DATA WHEN SEARCH TEXT CHANGES
useEffect(() => {
  const newFilteredData = data.filter((row) => {
    return (
      row.title?.toLowerCase().includes(searchText.toLowerCase()) ||
      row.category?.toLowerCase().includes(searchText.toLowerCase())
    );
  });
  setFilteredData(newFilteredData);
}, [searchText, data]);



    //EDIT AFTER VIEW
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedData, setEditedData] = useState<Data>({});

    const handleEditClick = () => {
      setIsEditMode(true);
      setEditedData(selectedRowData); // Initialize editedData with the current values
    }

    const handleSaveClick = () => {
      // Update the data in your application's state or API with editedData
      // ...
      setIsEditMode(false);
    }

    const handleCancelClick = () => {
      setIsEditMode(false);
      setEditedData({});
    }

    const handleFormChange = (field: string, value: string) => {
      setEditedData(prevData => ({
        ...prevData,
        [field]: value,
      }));
    }

    const EditMovieForm = () => {
      return (
        <Form>
          <Form.Item label="Title">
            <Input value={editedData.title} onChange={(e) => handleFormChange('title', e.target.value)} />
          </Form.Item>
          <Form.Item label="Duration">
            <Input value={editedData.duration} onChange={(e) => handleFormChange('duration', e.target.value)} />
          </Form.Item>
          <Form.Item label="Starring">
            <Input value={editedData.staring} onChange={(e) => handleFormChange('staring', e.target.value)} />
          </Form.Item>
          <Form.Item label="Category">
            <Input value={editedData.category} onChange={(e) => handleFormChange('category', e.target.value)} />
          </Form.Item>
        </Form>
      );
    }

    
    //VIEW STATE
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState<Data>({});


    //VIEW MODAL FUNCTIONS

    const showViewModal = (rowData: Data) => {
      setSelectedRowData(rowData ?? {});
      setIsViewModalOpen(true);
    }

    const handleViewOk = () => {
      setIsViewModalOpen(false);
    }

    const viewCancelClick = () => {
      setIsViewModalOpen(false);
    }

    //sort data variables
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const handleSortClick = () => {
      const sortedData = [...filteredData].sort((a, b) => {
        if (!a.title || !b.title) {
          return 0;
        }
        if (sortOrder === "asc") {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });
      setFilteredData(sortedData);
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };
    
  
    const ViewMovieModal = ({
      title,
      duration,
      staring,
      category,
    }: Data) => {
      return (
        <>
          <Modal
            title="Detail of Movie"
            visible={isViewModalOpen}
            onOk={handleViewOk}
            footer={[
              isEditMode ? (
                <>
                  <Button key="cancel" onClick={handleCancelClick}>Cancel</Button>
                  <Button key="save" type="primary" onClick={handleSaveClick}>Save</Button>
                </>
              ) : (
                <Button type="primary" size="small" onClick={() => setIsEditMode(true)}> Edit </Button>
              )
            ]}
          >
            {isEditMode ? (
              <EditMovieForm />
            ) : (
              <>
                <p>
                  <strong>Title:</strong> {title}
                </p>
                <p>
                  <strong>Duration:</strong> {duration}
                </p>
                <p>
                  <strong>Starring:</strong> {staring}
                </p>
                <p>
                  <strong>Category:</strong> {category}
                </p>
              </>
            )}
            <button key="cancel" onClick={viewCancelClick}>Cancel</button>
          </Modal>
        </>
      );
    };
    

    //CREATING A NEW MOVIE WITH THE API
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
  

    const handleOk = () => {
      form
      .validateFields()
      .then((values) => {
          fetch("https://localhost:44311/api/services/app/Movie/Create", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                setIsModalVisible(false);
                form.resetFields();
                setData((prevData) => [...prevData, data.result]);
              }
            });
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
          setConfirmLoading(true);
          setTimeout(() => {
          setConfirmLoading(false);
        }, 5000);
        };

    //DELETING A MOVIE
    const handleDeleteClick = async (row: any) => {
          try {
            const response = await fetch(
              `https://localhost:44311/api/services/app/Movie/Delete?id=${row.original.id}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const result = await response.json();
            if (result.success) {
              setData((prevData) =>
                prevData.filter((d) => d.id !== row.original.id)
              );
            }
          } catch (error) {
            console.error(error);
          }
        };


    //ADD MOVIE MODAL 
    const AddMovieModal = () => {
      return (
        <Modal
          title="Add Movie"
          visible={isModalVisible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={() => setIsModalVisible(false)}
          
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input the title!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Duration"
              name="duration"
              rules={[{ required: true, message: "Please input the duration!" }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Starring"
              name="staring"
              rules={[{ required: true, message: "Please input the starring!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please input the category!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Release Date"
              name="release_date"
              rules={[{ required: true, message: "Please input the release date!" }]}
            >
              <Input type="number" />
            </Form.Item>
          </Form>
        </Modal>
      );
    };



    return (
      <div className="App">
        
        <div className="container">
        <input
      type="text"
      placeholder="Search by title or category"
      value={searchText}
      onChange={handleSearch}
    />
        <Button type="primary" onClick={handleSortClick}>Sort</Button>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Add Movie
        </Button>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup: any) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column: any) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row: any) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell: any) => (
                      <td {...cell.getCellProps()}> {cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <AddMovieModal />
          <ViewMovieModal {...selectedRowData} />
        </div>
      </div>
    );
    
  }
  export default MovieTable;
