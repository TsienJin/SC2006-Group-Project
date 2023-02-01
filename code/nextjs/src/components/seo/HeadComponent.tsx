import Head from 'next/head'


export type HeadComponentProps = {
  title: string,
  description?: string
}

const HeadComponent = ({
  title,
  description='Navigate Singapore and know where the toilets are!',
}:HeadComponentProps) => {

  return(
    <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  )

}




export default HeadComponent
