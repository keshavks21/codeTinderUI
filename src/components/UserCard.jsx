
const UserCard = ({user}) => {

  const {firstName,lastName,photoUrl,about,gender,age} = user;

  return (
    <div className="mt-10 flex justify-center">
     <div className="card bg-base-100 w-96 shadow-xl ">
  <figure className="px-10 pt-10">
    <img
      src={photoUrl}
      alt="UserPhoto"
      className="rounded-xl" />
  </figure>
  <div className="card-body ">
    <div className="flex">
     <h2 className="card-title ">{firstName +" "+ lastName}</h2>
    <h2 className="card-title mx-5">{age}</h2>
    </div>
    <p>{about}</p> 
    <div className="card-actions">
      <button className="btn btn-primary">Interested</button>
      <button className="btn bg-rose-500">Ignore</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default UserCard
