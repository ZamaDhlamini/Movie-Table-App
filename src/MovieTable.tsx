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


    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    }  = useTable({ columns, data});

    //SEARCHING STATE VARIABLE
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState<Data[]>([]);

    useEffect(() => {
      setFilteredData(
        data.filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, [data, searchTerm]);
  
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    };



    //EDIT AFTER VIEW
    const [isEditMode, setIsEditMode] = useState(false);

    
    //VIEW STATE
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState<Data | null>(null);


    //VIEW MODAL FUNCTIONS

    const showViewModal = (rowData: Data) => {
      setSelectedRowData(rowData);
      setIsViewModalOpen(true);
    }

    const handleViewOk = () => {
      setIsViewModalOpen(false);
    }

  
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
          >
            <Button type="primary" size="small" onClick={() => setIsEditMode(true)}> Edit
              </Button>
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
          </Modal>
        </>
      );
    };

    //CREATING A NEW MOVIE WITH THE API
    const [isModalVisible, setIsModalVisible] = useState(false);
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

    //SEARCHING BY ALSO FILTER
    // const filteredRows = rows.filter((row: { original: { [s: string]: unknown; } | ArrayLike<unknown>; }) =>
    // Object.values(row.original)
    // .join(" ")
    // .toLowerCase()
    // .includes(searchTerm.toLowerCase())
    // );
    
    
  
    return (
      <div className="App">
        <div className="container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
//   const [data, setData] = useState<IMovieInfo[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [open, setOpen] = useState(false);
//   const [confirmLoading, setConfirmLoading] = useState(false);
//   const [modalText, setModalText] = useState('Content of the modal');

//   // interface TableData extends IMovieData {

  
  
//   interface IMovieInfo {
//     id: number;
//     title: string;
//     duration: number;
//     category: string;
//     starring: string;
//     release_date: string;
//   }

//   //   delete: string;
//   //   view: string;
//   //   edit: string;
//   //   actions: (row: any) => JSX.Element;
//   // }
 
  
//   useEffect(() => {
//     const fetchMovieData = async () => {
//       const response = await fetch("https://localhost:44311/api/services/app/Movie/GetAll");
//       const data = await response.json();
//     setData(data.result);
//   };
//   fetchMovieData();
//   }, [data]);
  
//   interface RowType{
//     id:number;
//     title: string;
//     duration: number;
//     category: string;
//     starring: string;
//     release_date: number;
//   }
  
//   //TABLE DATA
//   const columns = React.useMemo(
//     () => [
//       {
//         Header: "title",
//         accessor: "title",
//       },
//       {
//         Header: "duration",
//         accessor: "duration",
//       },
//       {
//         Header: "category",
//         accessor: "category",
//       },
//       {
//         Header: "starring",
//         accessor: "starring",
//       },
//       // {
//         //   Header: "release_Date",
//         //   accessor: "release_date",
//       // },
//       {
//         Header: "Actions",
//         accessor: "actions",
//         Cell: ({ row }: { row: RowType }) => (
//           <>
//             {/* <button onClick={() => handleViewMOdal(row)}>View</button> */}
//             <button onClick={() => handleEdit(row)}>Edit</button>
//             <button onClick={() => handleDeleteClick(row)}>Delete</button>
//           </>
//         ),
//       },
//     ],
//     []
//     );
//     //TABLE DATA

//     const showModal = () => {
//       setOpen(true);
//     };
    
//     const handleOk = () => {
//       setModalText('The modal will be closed after two seconds');
//       setConfirmLoading(true);
//       setTimeout(() => {
//         setOpen(false);
//         setConfirmLoading(false);
//       }, 2000);
//     };

//     const handleCancel = () => {
//       console.log('Clicked cancel button');
//       setOpen(false);
//     };
//     //TABLE PROPS
//     const {
//       getTableProps,
//       getTableBodyProps,
//       headerGroups,
//       rows,
//       prepareRow,
//     } = useTable({ columns, data });
//     //TABLE PROPS
    
//     // const rows: RowType[] = [{ id: 1, title: "John Doe", duration: 120, category: "Fanatsy", starring: "Keanu Reaves", release_date:120 } // add more rows here];
    
//     // Filter the table data based on the search term
//     const filteredRows = rows.filter((row: { original: { [s: string]: unknown; } | ArrayLike<unknown>; }) =>
//     Object.values(row.original)
//     .join(" ")
//     .toLowerCase()
//     .includes(searchTerm.toLowerCase())
//     );

//     const [selectedMovie, setSelectedMovie] = useState<IMovieInfo | null>(null);

//     const handleViewMOdal =(row: { original: IMovieInfo }) => {
//       //handle the logic for the view page
//     }
    
//   const handleEdit = (row: any) => {
//     //handle the logic for the edit page
//   }
//   const handleDeleteClick = async (row: any) => {
//     try {
//       const response = await fetch(
//         `https://localhost:44311/api/services/app/Movie/Delete?id=${row.original.id}`,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const result = await response.json();
//       if (result.success) {
//         setData((prevData) =>
//           prevData.filter((d) => d.id !== row.original.id)
//         );
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };


//   //add movie pop up
//   const handleAddMovie = () => {
//     setIsPopupOpen(true);
//   };
// // add movie pop up
//   const [isPopupOpen, setIsPopupOpen] = useState(false);

//   interface FormEvent extends React.FormEvent<HTMLFormElement> {
//     target: HTMLFormElement;
//   }

//   const handleSubmit = async (event: FormEvent) => {
//     event.preventDefault();
//     const newMovie = {
//       title: event.target.title.valueOf,
//       duration: event.target.duration.value,
//       category: event.target.category.value,
//       staring: event.target.starring.value,
//       release_date: event.target.release_date.value,
//     };

//   try {
//     const response = await fetch("https://localhost:44311/api/services/app/Movie/Create", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newMovie),
//     });
//     const data = await response.json();
//     setData([...data.result, newMovie]);
//     setIsPopupOpen(false);
//     console.log('pop up closes');
//   } catch (error) {
//     console.error(error);
//   }
// };

// //TABLE DIV INFO
// return (
//   <div className="App">
//        {/* <Button type="primary" onClick={showModal}>
//         Open Modal with async logic
//       </Button>
//       <Modal
//         title="Title"
//         open={open}
//         onOk={handleOk}
//         confirmLoading={confirmLoading}
//         onCancel={handleCancel}
//       >
//         <p>{modalText}</p>
//       </Modal> */}
//       <div className="container">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <div className="addMovieButton">
//           <button onClick={handleAddMovie}>Add Movie</button>
//         </div>
//         <table {...getTableProps()}>
//           <thead>
//             {headerGroups.map((headerGroup:any) => (
//               <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column:any) => (
//                   <th {...column.getHeaderProps()}>
//                     {column.render("Header")}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...getTableBodyProps()}>
//             {filteredRows.map((row:any) => {
//               prepareRow(row);
//               return (
//                 <tr {...row.getRowProps()}>
//                   {row.cells.map((cell:any) => (
//                     <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//         {isPopupOpen && (
//           <div className="popup">
//             <h1>Add New Movie</h1>
//             <form onSubmit={handleSubmit}>
//               <label>
//                 Title:
//                 <input type="text" name="title" required />
//               </label>
//               <label>
//                 Duration:
//                 <input type="text" name="duration" required />
//               </label>
//               <label>
//                 Category:
//                 <input type="text" name="category" required />
//               </label>
//               <label>
//                 Starring:
//                 <input type="text" name="starring" required />
//               </label>
//               <label>
//                 Release Date:
//                 <input type="text" name="release_date" required />
//               </label>
//               <button type="submit">Add</button>
//             </form>
//           </div>
//         )}
//       </div>
//   </div>
// );
//TABLE DIV INFO