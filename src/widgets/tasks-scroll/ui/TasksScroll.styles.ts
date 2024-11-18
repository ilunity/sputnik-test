import { Flex } from 'antd';
import { InView } from 'react-intersection-observer';
import { styled } from 'styled-components';

export const ScrollContainer = styled(Flex)`
    width: 400px;
    flex-direction: column;
    position: relative;
    gap: 30px;
`;

export const InViewTrigger = styled(InView)`
    height: 400px;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: -1;
`;

export const ScrollTrigger = styled.div`
    height: 100%;
    width: 100%;
`;
