"use client";

import { useState, useEffect } from 'react'

import PromptCard from "@components/PromptCard";
import { useSearchParams } from "@node_modules/next/navigation";

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className={"mt-16 prompt_layout"}>
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    )
}
const Feed = () => {

    const searchParams = useSearchParams();
    const searchedTag = searchParams.get("tag");

    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([])
    const [searchTimeout, setSearchTimeout] = useState(null);

    const handleTagClick = (tagName) => {
        setSearchText(tagName);

        const searchedPosts = filterPosts(tagName);
        setFilteredPosts(searchedPosts);
    }
    const filterPosts = (searchText) => {
        const regex = new RegExp(searchText, "i");
        return posts.filter((post) =>
            regex.test(post.tag) ||
            regex.test(post.prompt) ||
            regex.test(post.creator.username)
        );
    }
    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        const searchedText = e.target.value.trim();
        setSearchText(searchedText);

        if(!searchedText) {
            setFilteredPosts(posts);
            return;
        }

        setSearchTimeout(
            setTimeout(() => {
                const searchedPosts = filterPosts(searchedText);
                setFilteredPosts(searchedPosts);
            }, 500)
        );

    }

    useEffect( () => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt');
            const data = await response.json();
            setPosts(data);
            setFilteredPosts(data);
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        if(posts.length > 0 && searchedTag) {
            handleTagClick(searchedTag)
        }
    }, [posts]);


    return (
        <section className={"feed"}>
            <form className={"relative w-full flex-center"}>
                <input
                    type={"text"}
                    placeholder={"Search for a tag or a username"}
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className={"search_input peer"}
                />
            </form>

            <PromptCardList
                data={filteredPosts}
                handleTagClick={handleTagClick}
            />
        </section>
    )
}
export default Feed
