import React from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import axios from 'axios';
import { connect } from 'react-redux';

import { getPhotos } from './action';

const mapStateToProps = (state /*, ownProps*/) => {
    return {
      photos: state.photos,
      loading: state.loading
    }
  };

export const mapDispatchToProps = dispatch => {
    return {
        // getPhotos:getPhotos,
        getPhotos: () => dispatch(getPhotos()),
    };
  };
class Table extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
          data: [],
          loading: false,
          count: 5000,
          pages: 1000
       };
   }
//    start of server
getTestData(page, pageSize, sorted, filtered, handleRetrievedData) {
    let url = this.baseURL + "/getData";
    let postObject = {
        page: page,
        pageSize: pageSize,
        sorted: sorted,
        filtered: filtered,
    }; 

    return this.post(url, postObject).then(response => {
        console.log(response,'post call');
        handleRetrievedData(response)}).catch(response => console.log(response));
}

post(url, params = {}) {
    return axios.get("http://jsonplaceholder.typicode.com/photos?_start=0&_limit=5")
}
// end of server
    render() {
          const { data } = this.state;
          return (
              <>

              {JSON.stringify(this.props.photos)}
                  <ReactTable
                       data={data}
                       pages={this.state.pages}
                        columns={[
                             {
                               Header: "albumId",
                               accessor: "albumId"
                             },
                             {
                               Header: "title",
                               accessor: "title"
                             },
                             {
                               Header: "url",
                               Cell: row => (
                                <div>
                                <img className="img-responsive" src={row.original.url} />
                                
                                </div>
                                )
                            //    accessor: <img src={require(url)} />
                            
                              },
                              {
                                Header: "thumbnail",
                                Cell: row => (
                                 <div>
                                 <img className="img-responsive" src={row.original.thumbnailUrl} />
                                 
                                 </div>
                                 )
                             //    accessor: <img src={require(url)} />
                             
                               }
                            ]}
                      defaultPageSize={5}
                      className="-striped -highlight"
                      loading={this.state.loading}
                      showPagination={true}
                      showPaginationTop={false}
                      showPaginationBottom={true}
                      pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                      manual // this would indicate that server side pagination has been enabled 
                     onFetchData={(state, instance) => {
                            console.log(instance);
                             this.setState({loading: true});
                             this.props.getPhotos();
                    //          this.getTestData(state.page, state.pageSize, state.sorted, state.filtered, (res) => {
                    //              console.log(res,"resp");
                    //          this.setState({
                    //                  data: res.data,
                    //                   pages: 20,
                    //                  loading: false
                    //          })
                    //  });
                     }}
                     />
                     </>
         );
     }

    // render() {  
    //     const data = [{  
    //        name: 'Ayaan',  
    //        age: 26  
    //        },{  
    //         name: 'Ahana',  
    //         age: 22  
    //         },{  
    //         name: 'Peter',  
    //         age: 40      
    //         },{  
    //         name: 'Virat',  
    //         age: 30  
    //         },{  
    //         name: 'Rohit',  
    //         age: 32  
    //         },{  
    //         name: 'Dhoni',  
    //         age: 37  
    //         }]; 
    //     const columns = [{  
    //       Header: 'Name',  
    //       accessor: 'name'  
    //       },{  
    //       Header: 'Age',  
    //       accessor: 'age'  
    //       }];  
    //    return (  
    //          <div>  
    //              <ReactTable  
    //                  data={data}  
    //                  columns={columns}  
    //                  defaultPageSize = {2}  
    //                  pageSizeOptions = {[2,4, 6]}  
    //              />  
    //          </div>        
    //    )  
    //  }  
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Table);