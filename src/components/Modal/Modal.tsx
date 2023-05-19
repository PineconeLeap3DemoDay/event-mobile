import React, { useCallback, useEffect, useState } from 'react';
import Button from '../Button';
import { Dimensions, View } from 'react-native';
import { padding, responsiveHeight, responsiveWidth } from '../../utils';
import Heading from '../Heading';
import useModal from '../../hooks/useModal';
interface ModalProps {
    isOpen?: boolean;
    onSubmit?: () => void;
    title?: string;
    footer?: React.ReactNode;
    actionLabel?: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
    subTitle?: string
}
function Modal({
    isOpen,
    onSubmit,
    title,
    subTitle,
    disabled,
    secondaryAction,
}: ModalProps) {
    const [showModal, setShowModal] = useState(isOpen);
    const {onClose} = useModal();
    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);
    const handleClose = useCallback(() => {
        if (disabled) return;
        setShowModal(false);
        onClose()
    }, [disabled]);
    const handleSubmit = useCallback(() => {
        if (disabled) {
            return null;
        };
    }, [disabled, onSubmit]);
    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return null;
        }
        secondaryAction();
    }, [disabled, secondaryAction]);
    
    return (
            <View style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                position: 'absolute',
                top: 0,
                left: 0,
                width: Dimensions.get('screen').width,
                height: Dimensions.get('screen').height,
                justifyContent:'center',
                alignItems:'center',
                zIndex: 10
            }}>
                <View style={{
                    width: responsiveWidth(326),
                    height: responsiveHeight(200),
                    backgroundColor:'#080618',
                    borderRadius: 8,
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <Heading
                        fontFamily='Roboto-Medium'
                        style={{color:'#686873'}} 
                        h3 
                        title='Аккаунтаа устгах'
                    />
                    <Heading
                        fontFamily='Roboto-Medium'
                        style={{color:'#686873', ...padding(0,13,0,0)}} 
                        h5 
                        title='Аккаунтаа устгахдаа итгэлтэй байнуу?'
                    />
                    <View style={{flexDirection:'row', ...padding(0,15,0,0), gap: 12}}>
                        <Button 
                        onPress={handleClose}
                        style={{
                            width: responsiveWidth(132), 
                            height: responsiveHeight(49),
                            backgroundColor:'#080618',
                            borderWidth: 1,
                            borderColor: '#12121F'
                            }}>
                            <Heading
                                fontFamily='Roboto-Medium'
                                style={{color:'#686873'}} 
                                p 
                                title='Үгүй'
                            />
                        </Button>
                        <Button 
                       onPress={handleSubmit} 
                        style={{
                            width: responsiveWidth(132), 
                            height: responsiveHeight(49),
                            backgroundColor:'#12121F',
                            }}>
                            <Heading
                                fontFamily='Roboto-Medium'
                                style={{color:'white'}} 
                                p 
                                title='Тийм'
                            />
                        </Button>
                    </View>
                </View>
            </View>
    )
}

export default Modal