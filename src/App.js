import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { useEffect,useState } from 'react';
import './app.css';
function App() {
  const [tableData,setTableData] = useState([]);
  const [pageNumber,setPageNumber] = useState(0);
  const [filterId,setFilterId] = useState(0);
  const [timer, setTimer] = useState(null)
  const [newUsers,setNewUsers] = useState([]);
  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;




  useEffect(()=>{
    let fetchedData = getData();
      fetchedData.then((res,rej) =>{
      setTableData(res.data);
      res.page = 2;
    }).catch((err)=>{
      console.log(err);
    })
    if(filterId !== 0){
        //when filter displayUses nedd to have all data
        // eslint-disable-next-line react-hooks/exhaustive-deps
        displayUsers = tableData.map((data)=>{
        return(
          <tr key={data.id} style={{backgroundColor: data.color}}>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{data.year}</td>
          </tr>
          )
      })
      setNewUsers(handleFilterValue(filterId))
    }else if(filterId === 0 || filterId > 6){
      setNewUsers([])
    }
  },[filterId])



//async function
  async function getData(){
    let dataToFetch = await axios.get('https://reqres.in/api/products');
    let result = await dataToFetch.data;
    return result;
  }



  //pagination table
  let displayUsers = tableData.slice(pagesVisited, pagesVisited + usersPerPage).map((data)=>{
    return(
      <tr key={data.id} style={{backgroundColor: data.color}}>
        <td>{data.id}</td>
        <td>{data.name}</td>
        <td>{data.year}</td>
      </tr>
      )
  })



//filter functions
  const handleFilterValue = (filterId)=>{
    clearTimeout(timer);
    const newTimer = setTimeout(()=>{
    },500)
    displayUsers = displayUsers.filter((data) =>{
      return Number(data.key) === filterId
   })
    setTimer(newTimer);
    return displayUsers;
  }
 const handleFilter = e =>{
  setFilterId(Number(e.target.value));
 }


 //pageCounter for pagination
  const pageCount = Math.ceil(tableData.length / usersPerPage);
  const changePage = ({selected})=>{
    setPageNumber(selected);
  }

  return (
    <div className="App">
      <article className='container'>
      <article className='search'>
        <input value={filterId} min='0' max='6' onChange={handleFilter} type='number'  id='IDfilder'></input>
      </article>
      <table>
        <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>year</th>
        </tr>
        </thead>
        <tbody>
          {newUsers.length === 0 ? displayUsers : newUsers}
        </tbody>
      </table>
      <ReactPaginate 
        previousLabel={'Previous'}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationButtons"}
        previousLinkClassName={"previousLink"}
        nextLinkClassName={"nextLink"}
        pageLinkClassName={'links'}
        />
      </article>
    </div>
  );
}

export default App;
