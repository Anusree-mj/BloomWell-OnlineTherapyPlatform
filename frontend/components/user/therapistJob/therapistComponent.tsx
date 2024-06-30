import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/material/Button';
import Image from 'next/image';
import CircleIcon from '@mui/icons-material/Circle';

const practiceIcons = [
  { src: '/therapists/job1.png', content: 'Earn ₹500 per each hour for a  live session.' },
  { src: '/therapists/job2.png', content: 'Bonuses & incentives for high performers.' },
  { src: '/therapists/job3.png', content: 'Free BloomWell membership & earn more.' },
]

const requirements = [
  `Valid license to provide clinical therapy issued by a state board 
  (e.g., LCSW, LMFT, LPC, PsyD, or similar credentials)`,
  `Individual NPI number`,
  `3+ years of experience in therapy for adults, couples, and/or teens`,
  `Desktop or laptop computer with a reliable internet connection and a webcam`
]

const TherapistJobComponent = () => {
  return (
    <>
      {/* practice div starts */}
      <Box
        component="ul"
        sx={{
          backgroundColor: '#F8FBD5', pt: 4, pb: 4, height: '80vh'
        }}
      >
        <Typography sx={{
          fontSize: { xs: '1.5rem', sm: '1.5rem' },
          textAlign: 'center', color: '#325343',
          fontWeight: 600
        }
        }>Private practice with no doors & no overhead</Typography>
        <Box
          component="ul"
          sx={{
            display: 'flex', gap: 5, flexWrap: 'wrap', mt: 1,
            alignItems: 'center', justifyContent: 'space-around',
            backgroundColor: '#F8FBD5'
          }}
        >
          <Box sx={{
            display: 'flex', alignItems: 'center', flexDirection: 'column',
            justifyContent: 'center', maxWidth: '80%', mt: 1,
          }}>
            {
              practiceIcons.map((item, index) => (
                <Box key={index} sx={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', maxWidth: '100%', mt: 2,
                }}>
                  <Image
                    src={item.src}
                    alt='work flows'
                    width={80}
                    height={80}
                    layout='fixed'
                  />
                  <Typography sx={{
                    fontSize: '1rem',
                    textAlign: 'start', color: '#325343', ml: 1,
                    letterSpacing: '0.1rem',
                    fontWeight: 500
                  }
                  }>{item.content}</Typography>

                </Box>
              ))
            }
          </Box>
        
        </Box>
      </Box >
      {/* practice ends */}
      {/* requirements div starts */}
      <Box sx={{
        display: 'flex', alignItems: 'center', flexDirection: 'column',
        justifyContent: 'center', mt: 1, pt: 3, pb: 3, height: '80vh'
      }}>
        <Typography sx={{
          fontSize: { xs: '1.5rem', sm: '1.5rem' },
          textAlign: 'center', color: '#325343',
          fontWeight: 600
        }
        }>Basic Requirements</Typography>
        <Box sx={{
          display: 'flex', alignItems: 'flex-start', flexDirection: 'column',
          justifyContent: 'center', mt: 1,
        }}>
          {requirements.map((item, index) => (
            <Box key={index} sx={{
              display: 'flex', justifyContent: 'flex-start',
              alignItems: 'center', mt: 1

            }} >
              <CircleIcon sx={{
                width: '3rem', height: '0.6rem', color: '#325343'
              }} />
              <Typography sx={{
                fontSize: '1rem',
                textAlign: 'start', color: '#325343',
              }}>
                {item}
              </Typography>
            </Box>
          ))}
          <Typography sx={{
            fontSize: '1rem', mt: 2, fontStyle: 'italic',
            textAlign: 'start', color: '#325343', m: { xs: 2 }
          }}>
            Note: Unfortunately, if you are an intern or require supervision to provide therapy services,
            you cannot be a provider at BloomWell at this time.
          </Typography>
        </Box>
        <Button variant="contained" sx={{
          mt: 2, backgroundColor: '#325343', color: 'white', borderRadius: '1.2rem',
          pt: 1, pb: 1,
          '&:hover': {
            backgroundColor: '#49873D',
            color: 'white',
          }
        }}>
          Start application
        </Button>
      </Box>
    </>
  )
}

export default TherapistJobComponent