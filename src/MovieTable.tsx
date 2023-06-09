import { useState, useEffect } from "react";
import "./table.css"
import * as React from "react";
import { useTable, Column } from "react-table";
import { Button, Modal, Form, Input } from 'antd';
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { useMovies } from "./providers/movies";


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
    const { getMovie, MovieGotten} = useMovies();
    //SEARCHING STATE VARIABLE
    const [searchText, setSearchText] = useState('');
    //FILTERED DATA VARIABLE
    const [filteredData, setFilteredData] = useState<Data[]>(data);
    //EDIT AFTER VIEW
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedData, setEditedData] = useState<Data>({});
    //VIEW STATE
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState<Data>({});
    //CREATING A NEW MOVIE WITH THE API
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    
    
    const columns = React.useMemo(
      () => [
        {
          Header: "Poster",
          accessor: "poster",
          Cell: ({ row }: { row: any }) => (
            <div className="poster">
            <img src="barbie_poster.jpg" />
            </div>
          ),
        },
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
                      <div className="tableButton">
                        <div>
                        <button onClick={() => showViewModal(row.original)}>View</button>
                        </div>
                        <div>
                          <button onClick={() => handleDeleteClick(row)}>Delete</button>
                        </div>
                      </div>
                      </>
                    ),
        },
      ],
      []
    );

  
    useEffect(() => {
      // check if user is authenticated
        getMovie();
    }, []);
      
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

    const handleEditClick = () => {
      setIsEditMode(true);
      setEditedData(selectedRowData); // Initialize editedData with the current values
    }

    const handleSaveClick =  async () => {
      // event.preventDefault();
      
      try {
        // Make a PUT request to update the data
        const response = await fetch('https://localhost:44311/api/services/app/Movie/Update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedData),
        });
    
        if (response.ok) {
          // Data updated successfully
          setIsEditMode(false);
        } else {
          // Handle error if the request was not successful
        }
      } catch (error) {
        // Handle error if an exception occurred
      }
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

    //VIEW MODAL FUNCTIONS
    const showViewModal = (rowData: Data) => {
      setSelectedRowData(rowData ?? {});
      setIsViewModalOpen(true);
    }
     //#region handle view 
    const handleViewOk = () => {
      setIsViewModalOpen(false);
    }

    const viewCancelClick = () => {
      setIsViewModalOpen(false);
    }
     //#endregion handle view
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
            open={isViewModalOpen}
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
          open={isModalVisible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={() => setIsModalVisible(false)}
        >
            <Input />
          <Form form={form} layout="vertical">
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input the title!" }]}
            >
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
          <div className="search">
        <input className="searchInput"
      type="text"
      placeholder="Search by title or category"
      value={searchText}
      onChange={handleSearch}
      />
      </div>
        <div className="sortButton">
        <button onClick={handleSortClick}>Sort</button>
        </div>
        <div className="addMovieButton">
        <button onClick={() => setIsModalVisible(true)}>
          Add Movie
        </button>
        </div>
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


