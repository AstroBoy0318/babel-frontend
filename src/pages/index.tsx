import Router from 'next/router'

const Index = () => null

Index.getInitialProps = async ({ res }) => {
    if (res) {
        res.writeHead(302, {
            Location: `/genesis`
        })
        res.end()
    } 
    else
        Router.push(`/genesis`)

    return {}
}

export default Index
