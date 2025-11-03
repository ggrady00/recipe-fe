/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useSelector } from "react-redux";
import ProfilePage from "./ProfilePage/ProfilePage";
import MyRatings from "./MyRatings/MyRatings"

const UserProfile = ({user}) => {
    const [currentForm, setCurrentForm] = useState("profilePage")
    const recipes = useSelector((state)=>state.recipes)
    const savedRecipes = useSelector((state) => state.savedRecipes)
    const ratings = useSelector((state) => state.ratings);
    const myRatings = ratings.flatMap(recipe => {
        return recipe.ratings.filter(rating => rating.user_id === user.id)
    })

    return (
        <div>
            {currentForm === "profilePage" && <ProfilePage user={user} recipes={recipes} savedRecipes={savedRecipes} myRatings={myRatings} setCurrentForm={setCurrentForm} />}
            {currentForm === "myRatings" && <MyRatings setCurrentForm={setCurrentForm} myRatings={myRatings} recipes={recipes}/>}
        </div>
    )
}

export default UserProfile;