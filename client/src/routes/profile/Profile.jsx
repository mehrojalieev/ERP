import {useEffect}  from 'react'
import "./Profile.scss"
import { connect, useSelector } from 'react-redux'
import { loadPRofile } from "../../redux/actions/profile-action"
import { Button } from '../../utils'

const Profile = (props) => {
  const { user_profile } = useSelector(state => state.profile)
  console.log(user_profile);

  useEffect(() => {
    props.loadPRofile()
  }, [])
  return (
    <>
      <div className='admin__content-header'>
        <h1>Profile</h1>
      </div>

      <div className="profile-container">
        <div className="user-profile">
          <div className="profile-image">
            <h2>{user_profile?.name.slice(0, 1)}</h2>
          </div>
          <h3>{user_profile?.email}</h3>
        </div>
        <div className="actions-profile-container">
         <div className="action-profile">
         <div className='email'>
          <span>Email</span>
            <p>{user_profile?.email}</p>
          </div>
          <Button text={"Edit"}/>
         </div>
         <div className="action-profile">
         <div className='email'>
          <span>Password</span>
            <p>..........</p>
          </div>
          <Button text={"Edit"}/>
         </div>
        </div>
      </div>
    </>
  )
}

export default connect(null, { loadPRofile })(Profile)