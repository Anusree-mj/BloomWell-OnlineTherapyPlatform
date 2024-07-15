import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Image from 'next/image';
import SouthIcon from '@mui/icons-material/South';
import { Divider } from '@mui/material';

const contents = [
    {
        src: '/home/wrkflow1.png', title: 'Find the best therapist for you',
        content: `Answer a few questions to find a credentialled therapist who fits 
        your needs and preferences. Tap into the largest network of credentialled provider`
    },
    {
        src: '/home/wrkflow2.png', title: 'Find the best therapist for you',
        content: `Answer a few questions to find a credentialled therapist who fits 
        your needs and preferences. Tap into the largest network of credentialled provider`
    },
    {
        src: '/home/wrkflow3.png', title: 'Communicate your way',
        content: `You can message your therapist at anytime, from anywhere. You also get to
         schedule live sessions when it's convenient for you, and can connect from any mobile 
         device or computer.`
    },

]

export default function HowItWorks() {
    return (
        <Box
            component="ul"
            sx={{
                display: 'flex', gap: 5, flexWrap: 'wrap', pt: 10,
                flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: '#325343', pb: 3
            }}
        >
            <Typography sx={{
                fontSize: { xs: '1.5rem', sm: '2rem' },
                textAlign: 'center', color: 'white',
                letterSpacing: '0.1rem',
                fontWeight: 600
            }
            }>How BloomWell Works.</Typography>
            {
                contents.map((item, index) => (
                    <Box key={index} sx={{
                        display: 'flex', alignItems: 'center', flexDirection: 'column',
                        justifyContent: 'center', maxWidth: '80%', mt: 1, mb: 1,
                    }}>
                        <Box key={index} sx={{
                            display: 'flex', alignItems: 'center',
                            justifyContent: 'space-between', maxWidth: '100%',
                            flexDirection: { xs: 'column', sm: 'row' }, pb: 3,
                        }}>
                            {index % 2 === 0 ? (
                                <>
                                    <Image
                                        src={item.src}
                                        alt='work flows'
                                        width={300}
                                        height={100}
                                        layout='fixed'
                                    />
                                    <Box key={index} sx={{
                                        display: 'flex', flexDirection: 'column',
                                        maxWidth: '80%', ml: 2
                                    }}>
                                        <Typography sx={{
                                            fontSize: { xs: '1rem', sm: '1.5rem' },
                                            textAlign: 'start', color: 'white', mt: 2,
                                            letterSpacing: '0.1rem',
                                            fontWeight: 600
                                        }
                                        }>{item.title}</Typography>
                                        <Typography sx={{
                                            fontSize: { xs: '1rem', sm: '1rem' },
                                            textAlign: 'start', color: 'white', mt: 2,
                                            letterSpacing: '0.1rem',
                                            fontWeight: 500
                                        }
                                        }>{item.content}</Typography>
                                    </Box>

                                </>
                            ) : (
                                <>
                                    <Box key={index} sx={{
                                        display: 'flex', flexDirection: 'column',
                                        maxWidth: '80%', ml: 2
                                    }}>
                                        <Typography sx={{
                                            fontSize: { xs: '1rem', sm: '1.5rem' },
                                            textAlign: 'start', color: 'white', mt: 2,
                                            letterSpacing: '0.1rem',
                                            fontWeight: 600
                                        }
                                        }>{item.title}</Typography>
                                        <Typography sx={{
                                            fontSize: { xs: '1rem', sm: '1rem' },
                                            textAlign: 'start', color: 'white', mt: 2,
                                            letterSpacing: '0.1rem',
                                            fontWeight: 500
                                        }
                                        }>{item.content}</Typography>
                                    </Box>
                                    <Image
                                        src={item.src}
                                        alt='work flows'
                                        width={300}
                                        height={100}
                                        layout='fixed'
                                    />

                                </>
                            )}
                        </Box>
                        {index !== contents.length - 1 && (
                            <SouthIcon sx={{ color: 'white', fontSize: '4rem' }} />
                        )}
                    </Box>
                ))
            }
            <Divider sx={{ width: '100%', backgroundColor: 'white', height: '3px', }} />
        </Box >

    );
}
