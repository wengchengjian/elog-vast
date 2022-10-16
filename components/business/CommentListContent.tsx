import {SysUser} from '@/types/user';
import {Avatar, List, Skeleton} from '@douyinfe/semi-ui';
import ListContent from '../base/ListContent';
import CommentPlaceHolder from './CommentPlaceHolder';
import CommentView from './CommentView';

export type CommentListContentProps = {
    data: any[];
    page: number;
    loading: boolean;
    pageSize: number;
    total: number;
    author: SysUser;
    onPageChange: (page: number, pageSize: number) => void;
};

export default function CommentListContent({
                                               data,
                                               page,
                                               pageSize,
                                               loading,
                                               total,
                                               author,
                                               onPageChange,
                                           }: CommentListContentProps) {
    const renderItem = (item: any) => {
        return (
            <List.Item
                align={'flex-start'}
                key={item.id}
                header={
                    <div>
                        <Avatar
                            src={item.creator?.avatar}
                            alt="picture of the commentator"
                        />
                    </div>
                }
                main={<CommentView comment={item} author={author}/>}
            />
        );
    };

    const placeholder = (
        <div>
            <CommentPlaceHolder/>
            <CommentPlaceHolder/>
            <CommentPlaceHolder/>
            <CommentPlaceHolder/>
            <CommentPlaceHolder/>
        </div>
    );

    return (
        <>
            <div style={{width: '100%'}}>
                <Skeleton loading={loading} active placeholder={placeholder}>
                    <ListContent
                        total={total}
                        data={data}
                        page={page}
                        pageSize={pageSize}
                        onPageChange={onPageChange}
                        renderItem={renderItem}
                    />
                </Skeleton>
            </div>
        </>
    );
}
