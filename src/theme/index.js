import { extendTheme } from "@chakra-ui/react";

const activeLabelStyles = {
    transform : 'scale(0.85) translateY(-35px)',
}

export const theme = extendTheme({
    fonts: {
        heading : 'Inter, sans serif',
        body : 'Inter, sans-serif'
    },
    components: {
        Form: {
          variants: {
            floating: {
              container: {
                _focusWithin: {
                  label: {
                    ...activeLabelStyles,
                  },
                },
                'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label':
                  {
                    ...activeLabelStyles,
                  },
                input : {
                    borderRadius: 25,
                    border: "none",
                    boxShadow : "around"
                },
                label: {
                  top: 0,
                  left: 0,
                  zIndex: 2,
                  position: 'absolute',
                  backgroundColor: 'transparent',                 
                  pointerEvents: 'none',
                  mx: 3,
                  px: 1,
                  my: 2,
                  transformOrigin: 'left top'
                },
              },
            },
          },
        },
        Button: {
            variants: {
                solid: {
                    borderRadius : 25
                }
            }
        }
      },
      colors: {
        primary: {
          100 : '#207BFF'
        },
        secondary : { 
          100 : '#4EA5FF'
        },
        accent : {
          100:'#F5F7FA'}
      },
      shadows: {
        around : '0px 1px 1px 2px rgba(0, 0, 0, 0.2)',
        aroundmd : '0px 2px 2px rgba(0, 0, 0, 0.2)'
      },
})