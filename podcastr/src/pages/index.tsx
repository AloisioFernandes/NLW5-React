// SSR
// SSG

export default function Home(props) {
  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
}

// getServerSideProps() função que será executada pelo next antes do conteúdo ser exibido na tela, será executado a cada requisição, Server Side Rendering
export async function getStaticProps() { // Static Side Generation, gera uma página estático para cada usuário que acessar a aplicação que não precisa de atualizações frequentes. Só funciona em produção
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data
    },
    revalidate: 60 * 60 * 8, // 8 horas, tempo em segundos em que uma nova página será gerada
  }
}
