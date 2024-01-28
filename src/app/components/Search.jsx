"use client"
import { Button, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'



const Search = ({setUserData,setLoading}) => {
    const [query, setQuery] = useState("");
    const toast = useToast();

    const handleSubmitSearch = async(e) => {
        e.preventDefault();
        // alert(`Yor Search for ${query}`);
        if(!query) return;
        setLoading(true);
        setUserData(null);
        try{
            // github api we will fetch here for showing the result
            const res = await fetch(`https://api.github.com/users/${query}`);
            const data  = await res.json();
            // console.log(data , " data of fetch user is here ");
            if(data.message) {
                return toast({
                    title: "Error",
                    description: data.message === "Not Found" ? "User not found" : data.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
            setUserData(data); // data is set here 
            // here implementing the Search box models start
            addUserToLocalStorage(data,query);
            
        } catch (error) {
            toast({
                    title: "Error",
                    description: error.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
        }finally{
            // remove the spinner from the screen after animation
            setLoading(false);
        }
    };

// Search Box Models application build here
    const addUserToLocalStorage = (data,username) => {
        // check if user exit or not
        const users = JSON.parse(localStorage.getItem('github-users')) || [];
        const userExists = users.find(user => user.id === username);
        // console.lof(userExists , " this is userExits hai ");
        // first we remove it from the users array and then we will add it with unshift
        // if userExist then put in the top of the list
        if(userExists){
            users.splice(users.indexOf(userExists),1);
        }

        users.unshift({
            id: username,
            avatar_url: data.avatar_url,
            name: data.name,
            url: data.html_url
        });

        localStorage.setItem("github-users",JSON.stringify(users));

    }

    return (
        <form onSubmit={handleSubmitSearch}>
            <Input 
                variant={"outline"}
                placeholder={"Type of username (i.e divyansh-singh08)"}
                focusBorderColor='green.500'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button 
                size="md" 
                type="submit" 
                colorScheme="whatsapp" 
                mt={4}
                disabled={!query}
                opacity={!query ? 0.5 : 1}
            >
                Search
            </Button>
        </form>                                                     
    )
}

export default Search