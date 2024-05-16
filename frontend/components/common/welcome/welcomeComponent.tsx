import Box from '@mui/joy/Box';
import { Button, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface WelcomeComponentProps {
  welcomeText: string[];
}

const WelcomeComponent = ({ welcomeText }: WelcomeComponentProps) => {
  const router = useRouter()

  useEffect(() => {
    const clientData = localStorage.getItem('clientData')
    const therapistData = localStorage.getItem('therapistData')
    console.log('clientData:', clientData);
    console.log('therapistData:', therapistData);
    if (!clientData && !therapistData) {
      console.log('notsfdsdfsdfsdfdsaaaaa')
      router.push('/login')
    }
  }, [])

  const handleWelcomeNavigation = (link: string) => {
    console.log(link, 'link in handleonclick')
    router.push(`${link}`)
  }

  return (
    <Box sx={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <Typography sx={{
        fontSize: { xs: '1rem', sm: '1.5rem' }, mt: 2,
        textAlign: 'center', color: '#325343', fontWeight: 600
      }
      }>{welcomeText[0]}</Typography>
      <Typography sx={{
        fontSize: '0.9rem',
        textAlign: 'center', color: '#325343', mt: 1,
      }
      }>{welcomeText[1]}</Typography>
      <Box sx={{
        flexGrow: 1, display: { xs: 'flex', sm: 'flex' }, mt: 2
      }}
      >
        <Image
          src='/home/login.png'
          alt='Hooray!'
          width={250}
          height={100}
          layout='fixed'
        />
      </Box>
      <Typography sx={{
        fontSize: '0.9rem',
        textAlign: 'center', color: '#325343', mt: 2,
      }
      }>{welcomeText[2]}</Typography>
      <Button variant="contained"
        sx={{
          color: '#325343', mt: 2, borderRadius: '0.7rem',
          backgroundColor: '#a6de9b', mb: 3,
          '&:hover': {
            backgroundColor: '#325343',
            color: 'white'
          }
        }} onClick={() => { handleWelcomeNavigation(welcomeText[3]) }}>
        Get started</Button>
    </Box>
  )
}

export default WelcomeComponent