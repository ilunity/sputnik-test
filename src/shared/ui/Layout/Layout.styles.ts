import { Layout } from 'antd';
import { styled } from 'styled-components';

const { Content, Header } = Layout;

export const StyledLayout = styled(Layout)`
    min-height: 100vh;
    padding: 50px 150px 0;
`;

export const StyledHeader = styled(Header)`
    
`;

export const StyledContent = styled(Content)`
    margin: 0 auto;
`;
