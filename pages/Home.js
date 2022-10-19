import { useRouter } from 'next/router'

export default function home() {
    const router = useRouter()
    const user = router.query;
    return (
        <>
            <p>{user.username}</p>
            <p>{user.pass}</p>
        </>
    )
}
