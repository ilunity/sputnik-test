import { Flex, Space, Typography } from 'antd';
import { styled } from 'styled-components';

const { Title } = Typography;

export const SectionContainer = styled(Flex)`
    width: 100%;
    flex-direction: column;
    margin-bottom: 40px;
`;

export const SectionHeading = styled(Flex)`
    justify-content: space-between;
    align-items: center;
    column-gap: 40px;
    flex-wrap: wrap;
    margin-bottom: 20px;
`;

export const ActionContainer = styled(Space)`
    margin-top: 8px;
`;

export const SectionTitle = styled(Title)`
    margin-bottom: 0 !important;
`;