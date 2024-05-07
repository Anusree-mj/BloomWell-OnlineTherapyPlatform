import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Image from 'next/image';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const contents = [
    {
        src: '/home/works1.png', title: 'Find the best therapist for you',
        content: `Answer a few questions to find a credentialled therapist who fits 
        your needs and preferences. Tap into the largest network of credentialled provider`
    },
    {
        src: '/home/works2.png', title: 'Communicate your way',
        content: `Talk to your therapist whenever you feel comfortable —  chat or video.`
    },
    {
        src: '/home/works3.png', title: 'Therapy when you need it',
        content: `You can message your therapist at anytime, from anywhere. You also get to
         schedule live sessions when it's convenient for you, and can connect from any mobile 
         device or computer.`
    }
]

export default function HowItWorks() {
    return (
        <Box
            component="ul"
            sx={{
                display: 'flex', gap: 5, flexWrap: 'wrap', pt: 10,
                flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: '#F8FBD5'
            }}
        >
            <Typography sx={{
                fontSize: { xs: '1.5rem', sm: '2rem' },
                textAlign: 'center', color: '#325343',
                letterSpacing: '0.1rem',
                fontWeight: 600
            }
            }>How BloomWell Works.</Typography>
            {
                contents.map((item, index) => (
                    <Box key={index} sx={{
                        display: 'flex', alignItems: 'center', flexDirection: 'column',
                        justifyContent: 'center', maxWidth: '80%', mt: 1
                    }}>
                        <Box key={index} sx={{
                            display: 'flex', alignItems: 'center',
                            justifyContent: 'space-between', maxWidth: '100%', mt: 4, mb: 4,
                            flexDirection: { xs: 'column', sm: 'row' }
                        }}>
                            <Image
                                src={item.src}
                                alt='work flows'
                                width={650}
                                height={100}
                                layout='fixed'
                            />
                            <Box key={index} sx={{
                                display: 'flex', flexDirection: 'column',
                                maxWidth: '80%', mt: 4, mb: 4, ml: 2
                            }}>
                                <Typography sx={{
                                    fontSize: { xs: '1rem', sm: '1.5rem' },
                                    textAlign: 'start', color: '#325343', mt: 2,
                                    letterSpacing: '0.1rem',
                                    fontWeight: 600
                                }
                                }>{item.title}</Typography>
                                <Typography sx={{
                                    fontSize: { xs: '1rem', sm: '1rem' },
                                    textAlign: 'start', color: '#325343', mt: 2,
                                    letterSpacing: '0.1rem',
                                    fontWeight: 500
                                }
                                }>{item.content}</Typography>
                            </Box>
                        </Box>
                        {index !== contents.length - 1 && (
                            <Image
                                src='/home/arrow.png'
                                alt='arrow'
                                width={40}
                                height={40}
                                layout='fixed'
                            />
                        )}
                    </Box>
                ))
            }
        </Box >
    );
}
