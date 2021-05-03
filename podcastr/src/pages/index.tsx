import { GetStaticProps } from 'next'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { api } from '../services/api'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString'

type Episode = {
  id: string;
  title: string;
  members: string;
  published_at: string;
}

type HomeProps = {
  episodes: Episode[]
}

export default function Home(props: HomeProps) {
  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
}

// getServerSideProps() função que será executada pelo next antes do conteúdo ser exibido na tela, será executado a cada requisição, Server Side Rendering
export const getStaticProps: GetStaticProps = async () => { // Static Side Generation, gera uma página estática para cada usuário que acessar a aplicação que não precisa de atualizações frequentes. Só funciona em produção
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url

    }
  })

  return {
    props: {
      episodes
    },
    revalidate: 60 * 60 * 8, // 8 horas, tempo em segundos em que uma nova página será gerada
  }
}
