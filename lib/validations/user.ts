import * as z from 'zod';
export const UserValidatoin = z.object({
    profile_photo : z.string().url().nonempty(),
    name: z.string().min(3,{message: "MINIMUN 3 Charatacters"}).max(30),
    username : z.string().min(3).max(1000),
    bio: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(1000, { message: "Maximum 1000 caracters." }),
})