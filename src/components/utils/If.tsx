export const If = ({cond, children}) => {
    return cond && children || null;
}