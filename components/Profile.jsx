import PromptCard from "@components/PromptCard";
import {useRouter} from "@node_modules/next/navigation";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
    const router = useRouter();

    const handleTagClick = (tagName) => {
        router.push(`/?tag=${tagName}`);
    }

    return (
        <section className={"w-full"}>
            <h1 className={"head_text text-left"}><span className={"blue_gradient"}>{name}</span> Profile</h1>
            <p className={"desc text-left"}>{desc}</p>
            <div className={"mt-10 prompt_layout"}>
                {data.map((post) => (
                    <PromptCard
                        key={post._id}
                        post={post}
                        handleEdit={() => handleEdit && handleEdit(post)}
                        handleDelete={() => handleDelete && handleDelete(post)}
                        handleTagClick={handleTagClick}
                    />
                ))}
            </div>
        </section>
    )
}
export default Profile
