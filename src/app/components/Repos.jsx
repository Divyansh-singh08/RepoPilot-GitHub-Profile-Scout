"use client"
import { Badge, Button, Flex, Link, Spinner, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'

const Repos = ({reposUrl}) => {

    // Error Hooks ----> toast
    const toast = useToast();
    const [repos, setRepos] = useState([]);
    // want to show some spinner when loading 
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    console.log("repos", repos);
    // In react when we thinks about fetch data we should think about useEffect
    useEffect(() => {
        const fetchRepos = async () => {
            try{
                setLoading(true);
                const resRepo = await fetch(reposUrl);
                const dataRepo = await resRepo.json();
                if(dataRepo.message) throw new Error(dataRepo.message);
                // if we got the data without error then set the repos
                setRepos(dataRepo);
            }catch(error){
                toast({
                    title: "Error",
                    description: error.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }finally{
                setLoading(false);
            }
        }

        fetchRepos();
    },[reposUrl,toast]);
return <>
    <Text 
        textAlign={"center"}
        letterSpacing={1.5}
        fontSize={"3xl"}
        fontWeight={"bold"}
        color={"green.400"}
        mt={4}
    >
    REPOSITORIES
    </Text>
    {/* this is working of loading spinner */}
    {loading && (
        <Flex justifyContent={"center"}>
            <Spinner size={"xl"} my={4}/>
        </Flex>
    )}

{/* All repo will come in desc order, one by one and through the map function it display */}
    {repos.sort((a,b) => b.stargazers_count - a.stargazers_count).map((repo,idx) => {
    if(idx > 4 && !showMore) return null;
    return (
        <Flex 
            key={repo.id} 
            padding={4} 
            bg={"whiteAlpha.200"}
            _hover={{bg:"whiteAlpha.400"}}
            my={4}
            px={10}
            gap={4}
            borderRadius={4}
            transition={"all 0.3s ease"}
            justifyContent={"space-between"}
            alignItems={"center"}
        >
            <Flex flex={1} direction={"column"}>
            {/* left side of the repo container */}
            {/* the first repo name shown */}
                <Link href={repo.html_url} fontSize={"md"} fontWeight={"bold"}>
                    {repo.name}
                </Link>
                <Badge
                    fontSize={"0.7em"}
                    colorScheme={"whatsapp"}
                    w={"min-content"}
                    textAlign={"center"}
                    px={1}
                    mt={1}
                >
                Language: {repo.language || "None"}
                </Badge>
            </Flex>
            {/* right side of repo container */}
            <Flex
                flex={1}
                gap={4}
                ml={6}
            >
                <Badge fontSize={"0.9em"} colorScheme="orange" flex={1} textAlign={"center"}>
                    Stars: {repo.stargazers_count}
                </Badge>
                <Badge fontSize={"0.9em"} colorScheme="pink" flex={1} textAlign={"center"}>
                    Forks: {repo.forks_count}
                </Badge>
                <Badge fontSize={"0.9em"} colorScheme="cyan" flex={1} textAlign={"center"}>
                    Watchers: {repo.watchers_count}
                </Badge>
            </Flex>
        </Flex>
        );
    })}

{/* Show more */}
    {showMore && (
        <Flex justifyContent={"center"} my={4}>
            <Button size="md" colorScheme="whatsapp" onClick={() => setShowMore(false)}>
                Show Less
            </Button>
        </Flex>
    )}
{/* Not show more */}
    {!showMore && repos.length > 5 && (
        <Flex justifyContent={"center"} my={4}>
            <Button size="md" colorScheme="whatsapp" onClick={() => setShowMore(true)}>
                Show More
            </Button>
        </Flex>
    )}
</>
}

export default Repos