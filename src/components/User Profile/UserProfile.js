/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfilePage from "./ProfilePage/ProfilePage";
import MyRatings from "./MyRatings/MyRatings"

const UserProfile = ({user, setCurrentForm, setCurrentId, setPreviousForm, previousProfileForm, setPreviousProfileForm}) => {
    const [currentProfileForm, setCurrentProfileForm] = useState("profilePage")
    const recipes = useSelector((state)=>state.recipes)
    const savedRecipes = useSelector((state) => state.savedRecipes)
    const ratings = useSelector((state) => state.ratings);
    const myRatings = ratings.flatMap(recipe => {
        return recipe.ratings.filter(rating => rating.user_id === user.id)
    })

    useEffect(()=>{
        if(previousProfileForm) {
            setCurrentProfileForm(previousProfileForm)
            setPreviousProfileForm("")
        }
    },[previousProfileForm])

    return (
        <div>
            {currentProfileForm === "profilePage" && <ProfilePage user={user} recipes={recipes} savedRecipes={savedRecipes} myRatings={myRatings} setCurrentProfileForm={setCurrentProfileForm} />}
            {currentProfileForm === "myRatings" && <MyRatings setCurrentProfileForm={setCurrentProfileForm} myRatings={myRatings} recipes={recipes} setCurrentId={setCurrentId} setPreviousForm={setPreviousForm} setCurrentForm={setCurrentForm} setPreviousProfileForm={setPreviousProfileForm}/>}
        </div>
    )
}

export default UserProfile;