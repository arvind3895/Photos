import React from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import { connect } from 'react-redux';
import "./Table.css";

import { getPhotos,deletePhoto } from './action';

class Table extends React.Component {
   constructor() {
       super();
       this.state = {
          data: [],
          loading: false,
          count: 5000,
          pages: 1000
       };
   }
    render() {
          return (
              <>
                  <ReactTable
                       data={this.props?.photos?.data}
                       pages={this.state.pages}
                        columns={[
                             {
                               Header: "albumId",
                               accessor: "albumId"
                             },
                             {
                               Header: "title",
                               Cell: row =>(
                                   <div>
                                       {row.original.title}
                                   </div>
                               )
                             },
                             {
                               Header: "url",
                               Cell: row => (
                                <div>
                                  <img className="img-responsive" alt={row.original.title} style={{width:"100%"}}  src={row.original.url} />
                                </div>
                                )
                              },
                              {
                                Header: "thumbnail",
                                Cell: row => (
                                 <div>
                                  <img className="img-responsive" alt={row.original.title} style={{width:"100%"}} src={row.original.thumbnailUrl} />
                                 </div>
                                 )
                             
                               },
                               {
                                Header: "Delete",
                                Cell: row => (
                                    <div style={{textAlign: 'center' }}>
                                      <button onClick={()=>this.props.deletePhoto({index:row.index,row:row})}>
                                          delete
                                      </button>
                                 </div>
                                 )
                             
                               }
                            ]}
                      defaultPageSize={5}
                      className="-striped -highlight"
                      loading={this.props.loading}
                      showPagination={true}
                      showPaginationTop={false}
                      showPaginationBottom={true}
                      pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                      manual  
                     onFetchData={(state, instance) => {
                             this.props.getPhotos({page:instance.state.page, size:instance.state.pageSize});
                     }}
                     />
                     </>
         );
     }
}

const mapStateToProps = (state) => {
  return {
    photos: state.photos,
    loading: state.loading
  }
};

export const mapDispatchToProps = dispatch => {
  return {
      getPhotos: (params) => dispatch(getPhotos(params)),
      deletePhoto: (params) => dispatch(deletePhoto(params))
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Table);