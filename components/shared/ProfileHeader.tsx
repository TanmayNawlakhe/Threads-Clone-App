import Image from "next/image";

interface Props{
    accountId:string;
    authUserId:string;
    name:string;
    username:string;
    bio:string;
    imgUrl:string;
}

const ProfileHeader = ({
    accountId, authUserId, name , username,bio, imgUrl
}:Props)=>{

    return (
        <div>
            <div className="flex w-full flex-col justify-start">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative h-20 w-20 object-cover">
                            <Image src={imgUrl} alt="ProfilePhoto" fill className="rounded-full object-cover shadow-2xl"
                            />
                        </div>

                        <div className="flex-1">
                            <h2 className="text-left text-heading text-bold text-light-1">{name}</h2>
                            <p className="text-base-medium text-gray-1">@{username}</p>
                        </div>
                    </div>
                    </div>


                    <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}
                    </p>
                    <div className="mt-12 h-0.5 w-full bg-dark-3"></div>
            </div>
        </div>
    )
}
export default ProfileHeader;